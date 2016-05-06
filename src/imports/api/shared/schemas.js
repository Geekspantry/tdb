import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const validatedMethodUpdateSchema = new SimpleSchema({
  _id: {
    type: String
  },
  modifier: {
    type: Object,
    blackbox: true
  }
});

export const validatedMethodRemoveSchema = new SimpleSchema({
  _id: { type: String }
});

