import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ImpactSchema = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      omit: true
    }
  },
  expertise: {
    type: Number
  },
  industries: {
    type: Object
  }
});