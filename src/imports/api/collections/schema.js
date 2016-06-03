import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DescriptionSchema } from '/imports/api/lib/schemas/description_schema';

export const CollectionDescriptionWithStarSchema = new SimpleSchema([
  {
    status: {
      type: Number,
      autoform: {
        type: 'raty',
        ratyOptions: {}
      }
    }
  },
  DescriptionSchema.pick(['userId', 'createdAt', 'longText'])
]);

export const CollectionDescriptionSchema = DescriptionSchema.pick(['userId', 'createdAt', 'status', 'longText']);

export const CollectionSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: CollectionDescriptionSchema
  },
  projectId: {
    type: String
  },
  collectionsSetId: {
    type: String,
    optional: true
  },
  parentId: {
    type: String,
    optional: true
  },
  technologiesId: {
    type: [String],
    optional: true
  }
});
