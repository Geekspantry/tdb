import elasticsearch from 'elasticsearch';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

const MODIFIER_OPERATIONS = ['$set', '$unset', '$inc', '$push', '$pull', '$pop',
  '$rename', '$pullAll', '$addToSet', '$bit'
];


export class ElasticSearchTypeAPI {
  constructor({ esClient, index, type, mongoCollection, transformDoc, mapping }) {
    console.log('executing cosntructor...');

    this.esClient = esClient;
    this.index = index;
    this.mongoCollection = mongoCollection;
    this.type = type;
    this.transformDoc = transformDoc;
    this.mapping = mapping;

    this._extractKeysFromSimpleSchema();
    this._buildSchemaFromKeys();
    this._setupHelpers();
    this._setupHooks();
    this._setupMethods();
  }

  /**
   * Utils
   *
   */
  _extractKeysFromModifier(modifier) {
    let fields = [];
    _.each(modifier, function(params, op) {
      if (_.contains(MODIFIER_OPERATIONS, op)) {
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
  }


  _setupMethods() {
    let self = this;
    this.methods = {};
    this.methods.putMapping = new ValidatedMethod({
      name: `es.types.${self.type}.putMapping`,
      validate: null,
      run() {
        if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
          throw new Meteor.Error(403, 'not-authorized');
        }

        self.putMapping();
      }
    });

    /**
     * Reset Type
     */
     this.methods.bulkIndex = new ValidatedMethod({
      name: `es.types.${self.type}.bulkIndex`,
      validate: null,
      run() {
        if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
          throw new Meteor.Error(403, 'not-authorized');
        }

        self.bulkIndex({});
      }
     });
  }
  /**
   * SimpleSchema Integration
   */
  _buildSchemaFromKeys() {
    this.esSchema = this.mongoCollection.simpleSchema().pick(this.keys);
  }

  _extractKeysFromSimpleSchema() {
    if (!this.mongoCollection.simpleSchema()) {
      throw new Error(
      'ElasticSearchAPI requires an attached SimpleSchema instance on the MongoCollection');
    }
    const simpleSchema = this.mongoCollection.simpleSchema().schema();

    let keys = [];
    //  grab keys that have esDriver: true
    for (let key in simpleSchema) {
      if (simpleSchema[key].esDriver) {
        keys.push(key);
        // also add key.$ if it is an Array
        if (_.isArray(simpleSchema[key].type())) {
          keys.push(`${key}.$`);
        }
      }
    }

    this.keys = keys;
  }

  /**
   * Doc preprocessing, before sending to elastic search
   */
  _cleanDoc(doc) {
    if (this.esSchema) {
    	let newDoc = _.clone(doc);
      this.esSchema.clean(newDoc, {
        removeEmptyStrings: true
      });
      return newDoc;
    }
    return doc;
  }

  _applyTransformDoc(doc, originalDoc) {
    if (this.transformDoc && typeof this.transformDoc === 'function') {
      return this.transformDoc(doc, originalDoc);
    }
    return doc;
  }

  _prepareDoc(doc) {
    let cleanedDoc = this._cleanDoc(doc);
    let transformedAndCleanedDoc = this._applyTransformDoc(cleanedDoc, doc);
    return transformedAndCleanedDoc;
  }

  /**
   * Helpers
   */
  _setupHelpers() {
    let self = this;
    this.mongoCollection.helpers({
      esHelpers() {
        return {
          index() {
            let id = this._id;
            let preparedDoc = self._prepareDoc(this);
            self._indexDoc(id, preparedDoc);
          },
          update() {
            let id = this._id;
            let preparedDoc = self._prepareDoc(this);
            delete preparedDoc._id;

            self._updateDoc(id, preparedDoc);
          },
          remove() {
            let id = this._id;
            self._removeDoc(id);
          }
        };
      }
    });
  }

  /**
   * Elastic Search Operations
   */
  _indexDoc(id, doc) {
    this.esClient.index({
      index: this.index,
      type: this.type,
      id: id,
      body: doc
    }, function(err, res) {
      if (err) {
        console.error('ElasticSearchAPI error at indexing:');
        console.error(err.message);
      }
    });
  }

  _updateDoc(id, doc) {
    this.esClient.update({
      index: this.index,
      type: this.type,
      id: id,
      body: {
        doc: doc
      }
    }, function(err, res) {
      if (err) {
        console.error('ElasticSearchAPI error at update:');
        console.error(err.message);
      }
    });
  }

  _removeDoc(id) {
    this.esClient.delete({
      index: this.index,
      type: this.type,
      id: id
    }, function(err, res) {
      if (err) {
        console.error('ElasticSearchAPI error at remove:');
        console.error(err.message);
      }
    });
  }


  /**
   * Hooks
   */
  _setupInsertHook() {
    let self = this;

    this.mongoCollection.after.insert(function(userId, doc) {
      let docWithTransformations = this.transform();

      let id = docWithTransformations._id;
      let preparedDoc = self._prepareDoc(docWithTransformations);

      self._indexDoc(id, preparedDoc);
    });
  }

  _setupUpdateHook() {
    let self = this;

    this.mongoCollection.after.update(function(userId, doc, fieldNames, modifier) {
      let docWithTransformations = this.transform();

      let modifiedKeys = self._extractKeysFromModifier(modifier);

      if (_.intersection(modifiedKeys, self.keys).length) {
        let id = docWithTransformations._id;
        let preparedDoc = self._prepareDoc(docWithTransformations);

        delete preparedDoc._id;

        self._updateDoc(id, preparedDoc);
      }
    });
  }

  _setupRemoveHook() {
    let self = this;
    this.mongoCollection.after.remove(function(userId, doc) {
      let id = doc._id;
      self._removeDoc(id);
    });
  }

  _setupHooks() {
    this._setupRemoveHook();
    this._setupUpdateHook();
    this._setupInsertHook();
  }

  /**
   * Public
   */
  bulkIndex(query) {
    let bulkBody = [];

    this.mongoCollection.find(query).forEach((doc) => {
      bulkBody.push({
        index: {
          _index: this.index,
          _type: this.type,
          _id: doc._id,
        }
      });

      let preparedDoc = this._prepareDoc(doc);
      delete preparedDoc._id;

      bulkBody.push(preparedDoc);
    });

    let bulkReq = {
      body: bulkBody
    };

    this.esClient.bulk(bulkReq, (err, res) => {
      if (err) {
        console.error('ElasticSearchAPI error at bulk:');
        console.error(err.message);
      }
    });
  }


  putMapping() {
    this.esClient.indices.putMapping({
      index: this.index,
      type: this.type,
      body: {
        properties: this.mapping
      }
    }, (err, res) => {
      if (err) {
        console.error(`ElasticSearchAPI error at putMapping ${this.type}`);
        console.error(err.message);
      }
    });
  }

}
