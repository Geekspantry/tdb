import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UrlSchema = new SimpleSchema({
  url: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  type: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }
});
