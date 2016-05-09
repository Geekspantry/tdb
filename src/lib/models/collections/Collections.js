Collections = new Mongo.Collection('collections');

/**
 *
 * Schema
 *
 */

Schemas.CollectionDescriptionSchemaWithStar = new SimpleSchema([
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

Schemas.CollectionDescriptionSchema = Schemas.Description.pick(['userId', 'createdAt', 'status', 'longText']);

Schemas.Collection = new SimpleSchema({
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

/**
 *
 * Behaviours
 *
 */
Collections.attachSchema(Schemas.Collection);
Collections.attachBehaviour('timestampable');
Meteor.isServer && Collections.esDriver(esClient, 'organizations');


/**
 *
 * Helpers
 *
 */
Collections.helpers({
  getProjects() {
    return Projects.find({
      _id: {
        $in: this.projectsId || []
      }
    });
  },
  technologies() {
    return Technologies.find({
      _id: {
        $in: this.technologiesId || []
      }
    });
  },
  attachments() {
    return Attachments.find({
      _id: {
        $in: this.attachmentsId || []
      }
    });
  },
  logoImage() {
    if (this.logo) {
      return Images.findOne({
        _id: this.logo
      });
    }
  },
  childCollections() {
    return Collections.find({
      parentId: this._id
    });
  },
  techCount() {
    return this.technologiesId && this.technologiesId.length || 0;
  }
});
