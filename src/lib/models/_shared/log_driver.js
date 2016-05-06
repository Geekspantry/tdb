const OPERATION_INSERT = 'insert';
const OPERATION_REMOVE = 'remove';
const OPERATION_UPDATE = 'update';
const DEFAULT_REMOVE_DESCRIPTION = 'removed the document';
const DEFAULT_INSERT_DESCRIPTION = 'inserted the document';
const DEFAULT_UPDATE_DESCRIPTION = 'updated the document';
//
//  Allow SimpleSchema to have esDriver field
//
SimpleSchema.extendOptions({
  logDriver: Match.Optional(Boolean),
});

//
//  Get array of fields on a mongoDB modifier
//
getModifierFields = function(modifier) {
  // compute modified fields
  let fields = [];
  _.each(modifier, function(params, op) {
    if (_.contains(['$set', '$unset', '$inc', '$push', '$pull', '$pop',
        '$rename', '$pullAll', '$addToSet', '$bit'
      ], op)) {
      _.each(_.keys(params), function(field) {
        if (!_.contains(fields, field)) {
          fields.push(field);
        }
      });
    } else {
      fields.push(op);
    }
  });

  return fields;
};
Mongo.Collection.prototype.logDriver = function(collection, docIdentifier) {
  this.log = {};
  this.log.collection = collection;
  this.log.docIdentifier = docIdentifier;
  //
  //  check if there is an attached SimpleSchema instance
  //
  if (!this.simpleSchema()) {
    throw new Error('Log Driver needs an attached SimpleSchema instance.');
  }

  let collectionName = this._name;

  function remove$(modifier) {
    let cleanObj = {};
    if (typeof modifier === 'object') {
      for (let key in modifier) {
        if (modifier.hasOwnProperty(key)) {
          let cleanKey = key;
          if (key.charAt(0) === '$') {
            cleanKey = key.substr(1);
          }
          cleanObj[cleanKey] = remove$(modifier[key]);
        }
      }
    }else {
      return modifier;
    }
    return cleanObj;
  }

  function logOperation(operation, description, userId, doc, hook, modifier) {
    let docName = docIdentifier(doc, hook);
    let obj = {
      collection: collectionName,
      operation: operation,
      description: description,
      docId: doc._id,
      docName: docName,
    };

    if (userId) {
      obj.userId = userId;
    }

    if (modifier) {
      obj.modifier = JSON.stringify(modifier);
    }
    collection.insert(obj);
  }


  //
  //  grab collection simpleSchema instance
  //
  let schema = this.simpleSchema().schema();
  this.log.keys = [];
  //
  //  grab keys that have logDriver: true
  //
  for (let key in schema) {
    if (schema[key].logDriver) {
      this.log.keys.push(key);
      // also add key.$ if it is an Array
      if (_.isArray(schema[key].type())) {
        this.log.keys.push(`${key}.$`);
      }
    }
  }

  let self = this;
  //
  //  "insert" hooks
  //
  this.after.insert(function(userId, doc) {
    logOperation(OPERATION_INSERT, DEFAULT_INSERT_DESCRIPTION, userId, doc, this);
  });

  //
  //  "update" hook
  //
  this.after.update(function(userId, doc, fieldNames, modifier) {
    let modifiedKeys = getModifierFields(modifier);
    //
    //  are the modified fields being tracked ?
    //
    if (_.intersection(modifiedKeys, self.log.keys).length) {
      logOperation(OPERATION_UPDATE, DEFAULT_UPDATE_DESCRIPTION, userId, doc, this, modifier);
    }
  });

  //
  //  "remove" hook
  //
  this.after.remove(function(userId, doc) {
    logOperation(OPERATION_REMOVE, DEFAULT_REMOVE_DESCRIPTION, userId, doc, this);
  });
};
