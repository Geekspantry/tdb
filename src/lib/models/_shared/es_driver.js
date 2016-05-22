import elasticsearch from 'elasticsearch';
//
//  Allow SimpleSchema to have esDriver field
//
SimpleSchema.extendOptions({
  esDriver: Match.Optional(Boolean),
  esDriverTransformation: Match.Optional(Function)
});

if (Meteor.isServer) {
  //  ---------------------------------------------------------------------------------------
  //
  //  Declaring our ElasticSearch isntance
  //
  // read meteor settings to get elastic search URL
  let esUrl = process.env.ELASTICSEARCH_URL;
  if (!esUrl) throw new Error('Please config ES_URL on settings.json');

  // instantiate elasticsearch from npm
  //let elasticsearch = Meteor.npmRequire('elasticsearch');
  esClient = new elasticsearch.Client({
    host: esUrl
  });


  // A better result format on search methods
  esClient.prettySearch = function(searchObject, callback) {
    esClient.search(searchObject, function(err, res) {
      if (err) {
        return callback(err, null);
      }

      let results = _.map(res.hits.hits, function(hit) {
        return _.extend(hit._source, {
          _id: hit._id,
          _type: hit._type,
          _score: hit._score,
          _highlight: hit.highlight
        });
      });

      callback(null, {
        results: results,
        total: res.hits.total,
        took: res.took
      })

    });
  };
  //  ---------------------------------------------------------------------------------------


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


  Mongo.Collection.prototype.setMapping = function(mapping) {
    this.es.mapping = mapping;
  }

  Mongo.Collection.prototype.forceMapping = function() {
    this.es.conn.indices.putMapping({
      index: this.es.index,
      type: this.es.type,
      body: {
        properties: this.es.mapping
      }
    }, (err, res) => {
      if (err) {
        console.log(`Error setting map on ${this.es.type}`);
        console.log(err);
      }
    })

  }

  Mongo.Collection.prototype.bulkIndex = function(query) {
    let self = this;
    let bulkBody = [];

    this.find(query).forEach(function(doc) {
      let cleanedDoc = _.clone(doc);

      bulkBody.push({
        index: {
          _index: self.es.index,
          _type: self.es.type,
          _id: doc._id,
        }
      })

      self.es.schema.clean(cleanedDoc, {
        removeEmptyStrings: false
      });

      let finalDoc = {};
      if (self.es.transformFunction && typeof self.es.transformFunction === 'function') {
        finalDoc = self.es.transformFunction(cleanedDoc, doc);
      } else {
        finalDoc = cleanedDoc;
      }
      delete finalDoc._id;

      bulkBody.push(finalDoc);
    });

    let bulkReq = {
      body: bulkBody
    }

    this.es.conn.bulk(bulkReq, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }

  Mongo.Collection.prototype.esDriver = function(esConn, type, transformFunction, syncClient) {
    this.es = {};
    this.es.conn = esConn;
    this.es.index = Meteor.settings.public.elasticSearch.index;
    this.es.type = type;
    this.es.transformFunction = transformFunction;
    this.es.syncClient = syncClient;

    //
    //  check if there is an attached SimpleSchema instance
    //
    if (!this.simpleSchema()) {
      throw new Error('Riverable needs an attached SimpleSchema instance.');
    }

    //
    //  grab collection simpleSchema instance
    //
    let schema = this.simpleSchema().schema();
    this.es.keys = [];
    //
    //  grab keys that have esDriver: true
    //
    for (let key in schema) {
      if (schema[key].esDriver) {
        this.es.keys.push(key);
        // also add key.$ if it is an Array
        if (_.isArray(schema[key].type())) {
          this.es.keys.push(`${key}.$`);
        }
      }
    }


    //
    //  create a new schema from them
    //
    this.es.schema = this.simpleSchema().pick(this.es.keys);

    //
    //  Using self because inside hooks I need "this"
    //
    let self = this;

    let indexOnES = function(doc) {
      let cleanedDoc = _.clone(doc);
      self.es.schema.clean(cleanedDoc);

      let finalDoc = {};
      if (self.es.transformFunction && typeof self.es.transformFunction === 'function') {
        finalDoc = self.es.transformFunction(cleanedDoc, doc);
      } else {
        finalDoc = cleanedDoc;
      }

      if (finalDoc) {
        self.es.conn.index({
          index: self.es.index,
          type: self.es.type,
          id: doc._id,
          body: finalDoc
        }, function(err, res) {
          if (err) {
            console.error('ElasticSearchAdapter error at insert:');
            console.error(e.message);
          }
        });
      }
    }

    //
    //  "insert" hooks
    //
    this.after.insert(function(userId, doc) {
      let transformedDoc = this.transform();
      indexOnES(transformedDoc);
    });


    //
    //  "update" hook
    //
    this.after.update(function(userId, doc, fieldNames, modifier) {
      let modifiedKeys = getModifierFields(modifier);

      //
      //  are the modified fields being tracked ?
      //
      if (_.intersection(modifiedKeys, self.es.keys).length) {
        let cleanedDoc = _.clone(doc);
        self.es.schema.clean(cleanedDoc, {
          removeEmptyStrings: false
        });

        let finalDoc = {};
        if (self.es.transformFunction && typeof self.es.transformFunction === 'function') {
          finalDoc = self.es.transformFunction(cleanedDoc, doc, this);
        } else {
          finalDoc = cleanedDoc;
        }
        delete finalDoc._id; //  we will never update the _id

        if (finalDoc) {
          self.es.conn.update({
            index: self.es.index,
            type: self.es.type,
            id: doc._id,
            body: {
              doc: finalDoc
            }
          }, function(err, res) {
            if (err) {
              console.error('ElasticSearchAdapter error at update:');
              console.error(e.message);
            }
          });
        }
      }
    });

    //
    //  "remove" hook
    //
    this.after.remove(function(userId, doc) {
      self.es.conn.delete({
        index: self.es.index,
        type: self.es.type,
        id: doc._id
      }, function(err, res) {
        if (err) {
          console.error('ElasticSearchAdapter error at remove:');
          console.error(e.message);
        }
      });
    });


    this.helpers({
      reindexES() {
        indexOnES(this);
      }
    });
  }
}
