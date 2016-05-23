import { Attachments } from '../attachments';
import esClient from '../../elastic_search/es_client.js';
import { ElasticSearchTypeAPI } from '../../elastic_search/lib/elastic_search.js';

let index = Meteor.settings.public.elasticSearch.index;

let mapping = {
  description: {
    type: 'string'
  },
  from: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  type: {
    type: 'string'
  },
  web: {
    properties: {
      sourceUrl: {
        type: 'string'
      },
      thumbnailUrl: {
        type: 'string'
      }
    }
  }
};


export const AttachmentsES = new ElasticSearchTypeAPI({
  esClient: esClient,
  index: index,
  type: 'attachments',
  mongoCollection: Attachments,
  mapping: mapping
});
