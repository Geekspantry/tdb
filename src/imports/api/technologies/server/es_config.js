import { Technologies } from '../technologies.js';
import esClient from '../../elastic_search/es_client.js';
import { ElasticSearchTypeAPI } from '../../elastic_search/lib/elastic_search.js';

let index = Meteor.settings.public.elasticSearch.index;

let mapping = {
  description: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  shortDescription: {
    type: 'string'
  },
  status: {
    type: 'string'
  },
  techId: {
    type: 'string'
  }
};

function transformDoc(cleanedDoc, doc) {
  let publishedDescription = doc.getPublishedDescription();
  if (publishedDescription && publishedDescription.longText) {
    cleanedDoc.description = TagStripper.strip(publishedDescription.longText);
    cleanedDoc.shortDescription = publishedDescription.shortText || '';
  } else {
    delete cleanedDoc.description;
  }

  let showcasedImage = doc.getShowcasedImage();
  if (showcasedImage) {
    cleanedDoc.image = showcasedImage.src;
  }
  delete cleanedDoc.images;
  return cleanedDoc;
}


export const TechnologiesES = new ElasticSearchTypeAPI({
  esClient: esClient,
  index: index,
  type: 'technologies',
  mongoCollection: Technologies,
  transformDoc: transformDoc,
  mapping: mapping
});
