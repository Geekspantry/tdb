/**
 * ElasticSearchAdapter
 * must implement insertDoc, removeDoc, updateDoc
 *
 * constructor:
 * @client {elasticsearch} elastic search connection instance
 * @index {String} elastic search index
 * @type {String} elastic search type
 * @docTransformer {simpleSchema} must implement clean
 */
ElasticSearchAdapter = class ElasticSearchAdapter { // implements riverOperations
  constructor(client, index, type, docTransformer, config) {
    if (!client) throw new Error('Client must be specified');
    if (!index) throw new Error('Index must be specified');
    if (!type) throw new Error('Type must be specified');

    this.index = index;
    this.type = type;
    this.client = client;
    this.docTransformer = docTransformer;
    this.config = config || {};
  }

  insertDoc(userId, doc) {
    let finalDoc = this.docTransformer(doc);
    try {
      return this.client.index({
        index: this.index,
        type: this.type,
        id: doc._id,
        body: finalDoc
      });
    } catch (e) {
      console.log('ElasticSearchAdapter error at insert:');
      console.log(e.message);
    }
  }

  removeDoc(userId, doc) {
    try {
      return this.client.delete({
        index: this.index,
        type: this.type,
        id: doc._id
      });
    } catch (e) {
      console.log('ElasticSearchAdapter error at remove:');
      console.log(e.message);
    }
  }

  updateDoc(userId, doc, fieldNames, modifier) {
    let id = doc._id;
    let finalDoc = this.docTransformer(doc, modifier);
    delete finalDoc._id;
    if (!finalDoc) return false;

    if (this.config.trackedFields) {
      if (!_.intersection(fieldNames, this.config.trackedFields).length) {
        return false;
      }
    }
    try {
      return this.client.update({
        index: this.index,
        type: this.type,
        id: id,
        body: {
          doc: finalDoc
        }
      });
    } catch (e) {
      console.log('ElasticSearchAdapter error at update:');
      console.dir(e.message);
    }
  }
};
