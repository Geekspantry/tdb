const OPERATION_INSERT = 'insert';
const OPERATION_REMOVE = 'remove';
const OPERATION_UPDATE = 'update';
const DEFAULT_REMOVE_DESCRIPTION = 'removed the document';
const DEFAULT_INSERT_DESCRIPTION = 'inserted the document';
const DEFAULT_UPDATE_DESCRIPTION = 'updated the document';

LogAdapter = class LogAdapter {
  constructor(logCollection, collection, getDocIdentifier, config) {
    if (!collection) throw new Error('Collection must be specified');
    if (!getDocIdentifier) throw new Error('Must pass function to get doc name');
    this.collection = collection;
    this.getDocIdentifier = getDocIdentifier;
    this.logCollection = logCollection;
    this.config = config || {};
  }

  getEntityName() {
    return this.collection._name;
  }

  logOperation(operation, description, userId, doc) {
    let collection = this.collection._name;
    let docName = this.getDocIdentifier(doc);
    let obj = {
      collection: collection,
      operation: operation,
      description: description,
      docId: doc._id,
      docName: docName
    };

    if (userId) {
      obj.userId = userId;
    }

    this.logCollection.insert(obj);
  }


  insertDoc(userId, doc) {
    this.logOperation(OPERATION_INSERT, DEFAULT_INSERT_DESCRIPTION, userId, doc);
  }

  removeDoc(userId, doc) {
    this.logOperation(OPERATION_REMOVE, DEFAULT_REMOVE_DESCRIPTION, userId, doc);
  }

  updateDoc(userId, doc, fieldNames, modifier, options) {
    if (this.config.trackedFields) {
      if (!_.intersection(fieldNames, this.config.trackedFields).length) return false;
    }
    
    this.logOperation(OPERATION_UPDATE, DEFAULT_UPDATE_DESCRIPTION, userId, doc);

    /*
    for (let property in object) {
      if (object.hasOwnProperty(property)) {
        console.log(property);
      }
    }
    */
  }
};
