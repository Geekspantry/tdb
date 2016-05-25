import { Projects } from '../projects';
import esClient from '../../elastic_search/es_client.js';
import { ElasticSearchTypeAPI } from '../../elastic_search/lib/elastic_search.js';

let index = Meteor.settings.public.elasticSearch.index;

let mapping = {
  description: {
    type: 'string'
  },
  image: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  status: {
    type: 'string'
  }
};


export const ProjectsES = new ElasticSearchTypeAPI({
  esClient: esClient,
  index: index,
  type: 'projects',
  mongoCollection: Projects,
  mapping: mapping
});
