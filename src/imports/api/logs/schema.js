import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const LogSchema = new SimpleSchema({
  collection: {
    type: String
  },
  operation: {
    type: String
  },
  userId: {
    type: String,
    optional: true,
  },
  username: {
    type: String,
    optional: true
  },
  description: {
    type: String
  },
  docId: {
    type: String
  },
  docName: {
    type: String
  },
  modifier: {
    type: String,
    optional: true
  }
});
