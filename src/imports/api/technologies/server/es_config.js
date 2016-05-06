import { Technologies } from '../technologies.js';

Technologies.esDriver(esClient, 'technologies', (cleanedDoc, doc, hook) => {
  let tDoc = hook.transform();
  let publishedDescription = tDoc.getPublishedDescription();
  if (publishedDescription && publishedDescription.longText) {
    cleanedDoc.description = TagStripper.strip(publishedDescription.longText);
    cleanedDoc.shortDescription = publishedDescription.shortText || '';
  } else {
    delete cleanedDoc.description;
  }

  let showcasedImage = tDoc.getShowcasedImage();
  if (showcasedImage) {
    cleanedDoc.image = showcasedImage.src;
  }
  delete cleanedDoc.images;

  return cleanedDoc;
});
