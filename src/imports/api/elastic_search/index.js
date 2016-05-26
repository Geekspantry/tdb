import { ElasticSearchIndexAPI } from './lib/elastic_search_index.js';
import esClient from './es_client.js';

let index = Meteor.settings.public.elasticSearch.index;

let elasticSearchIndex = new ElasticSearchIndexAPI({
	index: index,
	esClient: esClient
});

