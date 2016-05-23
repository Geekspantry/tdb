import { ElasticSearchIndexAPI } from './lib/elastic_search_index.js';
import esClient from './es_client.js';

let elasticSearchIndex = new ElasticSearchIndexAPI({
	index: 'tdb-development',
	esClient: esClient
});

