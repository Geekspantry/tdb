import { Organizations } from '../organizations.js';
import esClient from '../../elastic_search/es_client.js';
import { ElasticSearchTypeAPI } from '../../elastic_search/lib/elastic_search.js';

let index = Meteor.settings.public.elasticSearch.index;

let mapping = {
  country: {
    type: 'string'
  },
  description: {
    type: 'string'
  },
  foundingYear: {
    type: 'long'
  },
  logo: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  type: {
    type: 'string'
  }
};

export const OrganizationsES = new ElasticSearchTypeAPI({
  esClient: esClient,
  index: index,
  type: 'organizations',
  mongoCollection: Organizations,
  mapping: mapping
});

