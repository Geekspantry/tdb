Projects = new Mongo.Collection('projects');


/**
 *
 * Schema
 *
 */

Schemas.Project = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true,
  },
  image: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Choose file',
      }
    }
  },
  description: {
    type: String,
    esDriver: true,
    logDriver: true,
    autoform: {
      type: 'textarea',
      rows: 6
    }
  },
  status: {
    type: String,
    allowedValues: ['prospect', 'open', 'closed'],
    autoform: {
      type: 'selectize',
      options: [{
        value: 'prospect',
        label: 'Prospect'
      }, {
        value: 'open',
        label: 'Open'
      }, {
        value: 'closed',
        label: 'Closed'
      }]
    }
  },
  evId: {
    type: String,
    label: 'evId',
    logDriver: true,
  },

  url: {
    type: String,
    logDriver: true,
  },
  technologiesStash: {
    type: [String],
    optional: true,
    label: 'Technologies Stash',
    autoform: {
      type: 'universe-select',
      multiple: true,
      uniPlaceholder: 'Search by technology title...',
      options: () => Technologies.quickList({})
    }
  },
  collectionsSet: {
    type: [Schemas.CollectionsSet],
    optional: true
  },
  organizationsId: {
    type: [String],
    logDriver: true,
    optional: true,
    label: 'Organizations',
    autoform: {
      type: 'universe-select',
      multiple: true,
      uniPlaceholder: 'Search by organization title...',
      options: () => Organizations.quickList()
    }
  },
  attachmentsId: {
    type: [String],
    optional: true,
    label: 'Related Attachments',
    autoform: {
      afFieldInput: {
        type: 'universe-select',
        multiple: true,
        uniPlaceholder: 'Search attachments by title...',
        options() {
          return Attachments.find().map((attachment) => {
            return {
              label: attachment.name,
              value: attachment._id
            };
          });
        }
      }
    }
  },
  usersId: {
    type: [String],
    logDriver: true,
    optional: true
  }
});

/**
 *
 * Behaviours
 *
 */
Projects.attachSchema(Schemas.Project);
Projects.attachBehaviour('timestampable');
Meteor.isServer && Projects.esDriver(esClient, 'techdb', 'projects');


Projects.helpers({
  link: function() {
    return window.location.host + '/projects/' + this._id + '/entry';
  }
});