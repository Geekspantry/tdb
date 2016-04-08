Collections = new Mongo.Collection('collections');

/**
 *
 * Schema
 *
 */
Schemas.Collection = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: Schemas.Description.pick(['userId', 'createdAt', 'status', 'longText'])
  },
  projectId: {
    type: String
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
Meteor.isServer && Collections.esDriver(esClient, 'techdb', 'organizations');


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
  }
});
