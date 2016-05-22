import elasticsearch from 'elasticsearch';

const MODIFIER_OPERATIONS = ['$set', '$unset', '$inc', '$push', '$pull', '$pop',
  '$rename', '$pullAll', '$addToSet', '$bit'
];

export class ElasticSearchIndexAPI {
  constructor({ esClient, index }) {
    this.esClient = esClient;
    this.index = index;
  }


  _deleteIndex(callback) {
    esClient.indices.delete({
      index: this.index,
    }, (err, res) => {
      if (err) {
        console.error('ElasticSearchIndexAPI error at deleteIndex:');
        console.error(e.message);
        callback(err, null);
      }
      callback(null, res);
    })
  }

  _createIndex(callback) {
    esClient.indices.create({
      index: this.index,
    }, (err, res) => {
      if (err) {
        console.error('ElasticSearchIndexAPI error at createIndex:');
        console.error(e.message);
        callback(err, null);
      }
      callback(null, res);
    })
  }
}

export class ElasticSearchTypeAPI {
  constructor({ esClient, index, type, mongoCollection, transformDoc, mapping }) {
    this.esClient = esClient;
    this.index = index;
    this.mongoCollection = mongoCollection;
    this.type = type;
    this.transformDoc = transformDoc;
    this.mapping = mapping;

    this._extractKeysFromSimpleSchema();
    this._buildSchemaFromKeys();
    this._setupHelpers()
    this._setupHooks();

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

  /**
   * SimpleSchema Integration
   */
  _buildSchemaFromKeys() {
    this.esSchema = this.mongoCollection.simpleSchema().pick(this.keys);
  }

  _extractKeysFromSimpleSchema() {
    const simpleSchema = this.mongoCollection.simpleSchema().schema();
    if (!simpleSchema) throw new Error(
      'ElasticSearchAPI requires an attached SimpleSchema instance on the MongoCollection');

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
    	let newDoc = _.clone(doc)
      this.esSchema.clean(newDoc, {
        removeEmptyStrings: true
      });
      return newDoc;
    }
  }

  _applyTransformDoc(doc, originalDoc) {
    if (this.transformDoc && typeof this.transformDoc === 'function') {
      return this.transformDoc(doc, originalDoc);
    } else {
      return doc;
    }
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
        }
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
        console.error(e.message);
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
        console.error(e.message);
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
        console.error(e.message);
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

      let modifiedKeys = self._extractKeysFromModifier(modifier)

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
    let self = this;
    let bulkBody = [];

    this.mongoCollection.find(query).forEach(function(doc) {
      bulkBody.push({
        index: {
          _index: self.es.index,
          _type: self.es.type,
          _id: doc._id,
        }
      })

      let preparedDoc = self._prepareDoc(doc);
      delete preparedDoc._id;

      bulkBody.push(finalDoc);
    });

    let bulkReq = {
      body: bulkBody
    }

    this.esClient.bulk(bulkReq, (err, res) => {
      if (err) {
        console.error('ElasticSearchAPI error at bulk:');
        console.error(e.message);
      }
    });
  }


  putMapping() {
    this.client.indices.putMapping({
      index: this.index,
      type: this.type,
      body: {
        properties: this.mapping
      }
    }, (err, res) => {
      if (err) {
        console.log(`ElasticSearchAPI error at putMapping ${this.type}`);
        console.log(err);
      }
    })
  }

}
