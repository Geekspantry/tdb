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
  Schemas.Description.pick(['userId', 'createdAt', 'longText'])
]);

export const CollectionDescriptionSchema = Schemas.Description.pick(['userId', 'createdAt', 'status', 'longText']);

export const CollectionSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: Schemas.CollectionDescriptionSchema
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
