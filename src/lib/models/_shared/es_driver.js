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
  let asyncEsClient = new elasticsearch.Client({
    host: esUrl
  });


  //  wraps elasticsearch from npm on sync methods
  esClient = Async.wrap(asyncEsClient, ['index', 'search', 'update', 'delete']);

  // A better result format on search methods
  esClient.prettySearch = function(searchObject) {

    let searchResponse = this.search(searchObject);
    let results = _.map(searchResponse.hits.hits, function(hit) {
      return _.extend(hit._source, {
        _id: hit._id,
        _type: hit._type,
        _score: hit._score,
        _highlight: hit.highlight
      });
    });

    return {
      results: results,
      total: searchResponse.hits.total,
      took: searchResponse.took
    };
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
       '$rename', '$pullAll', '$addToSet', '$bit'], op)) {
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


  Mongo.Collection.prototype.esDriver = function(esConn, type, transformFunction) {
    this.es = {};
    this.es.conn = esConn;
    this.es.index = Meteor.settings.public.elasticSearch.index;
    this.es.type = type;
    this.es.transformFunction = transformFunction;
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
    //
    //  "insert" hooks
    //
    this.after.insert(function(userId, doc) {
      let cleanedDoc = _.clone(doc);
      self.es.schema.clean(cleanedDoc);

      let finalDoc = {};
      if (self.es.transformFunction && typeof self.es.transformFunction === 'function') {
        finalDoc = self.es.transformFunction(cleanedDoc, doc, this);
      } else {
        finalDoc = cleanedDoc;
      }

      if (finalDoc) {
        try {
          self.es.conn.index({
            index: self.es.index,
            type: self.es.type,
            id: doc._id,
            body: finalDoc
          });
        } catch (e) {
          console.error('ElasticSearchAdapter error at insert:');
          console.error(e.message);
        }
      }
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
        delete finalDoc._id;  //  we will never update the _id
        
        if (finalDoc) {
          try {
            return self.es.conn.update({
              index: self.es.index,
              type: self.es.type,
              id: doc._id,
              body: {
                doc: finalDoc
              }
            });
          } catch (e) {
            console.error('ElasticSearchAdapter error at update:');
            console.error(e.message);
          }
        }
      }
    });

    //
    //  "remove" hook
    //
    this.after.remove(function(userId, doc) {
      try {
        return self.es.conn.delete({
          index: self.es.index,
          type: self.es.type,
          id: doc._id
        });
      } catch (e) {
        console.error('ElasticSearchAdapter error at remove:');
        console.error(e.message);
      }
    });
  };
}
