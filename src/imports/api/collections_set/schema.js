/**
 * CollectionsSet Schema
 */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CollectionsSetSchema = new SimpleSchema({
  name: {
    type: String
  },
  collectionsId: {
    type: [String],
    optional: true
  },
  projectId: {
    type: String
  }
});
