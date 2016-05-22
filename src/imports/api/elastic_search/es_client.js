import elasticsearch from 'elasticsearch';

let esUrl = process.env.ELASTICSEARCH_URL;
if (!esUrl) throw new Error('Please config ES_URL on settings.json');

let esClient = new elasticsearch.Client({
  host: esUrl
});

export default esClient;
