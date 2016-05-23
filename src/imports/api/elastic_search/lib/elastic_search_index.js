import { ValidatedMethod } from 'meteor/mdg:validated-method';
export class ElasticSearchIndexAPI {
  constructor({ esClient, index }) {
    this.esClient = esClient;
    this.index = index;

    this._setupMethods();
  }

  _setupMethods() {
    let self = this;
    this.methods = {};

    this.methods.rebuildIndex = new ValidatedMethod({
      name: `es.indices.${self.index}.rebuildIndex`,
      validate: null,
      run() {
        self.rebuildIndex();
      }
    });
  }

  rebuildIndex(callback = function() {}) {
    this._deleteIndex((err, res) => {
      if (err) {
        callback(err, null);
        return;
      }
      this._createIndex((err2, res2) => {
        if (err) {
          callback(err2, null);
          return;
        }
        callback(null, res2);
      });
    });
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
    });
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
    });
  }
}
