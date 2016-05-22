import { Projects } from '../../../imports/api/projects/projects';
import { Technologies } from '../../../imports/api/technologies/technologies';

Organizations = new Mongo.Collection('organizations');

Schemas.Organization = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true
  },
  description: {
    type: String,
    esDriver: true,
    logDriver: true,
    autoform: {
      type: 'textarea',
      rows: 4
    }
  },
  foundingYear: {
    type: Number,
    esDriver: true,
    logDriver: true,
    optional: true
  },
  country: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true,
    autoform: {
      type: 'countryFlags'
    }
  },
  type: {
    type: String,
    esDriver: true,
    logDriver: true,
    allowedValues: ['academic', 'non-profit', 'governamental', 'private'],
    optional: true,
    autoform: {
      type: 'selectize',
      options: [{
        label: 'Academic',
        value: 'academic'
      }, {
        label: 'Non-Profit',
        value: 'non-profit'
      }, {
        label: 'Governamental',
        value: 'governamental'
      }, {
        label: 'Private',
        value: 'private'
      }]
    }
  },
  keyPeople: {
    type: [Schemas.KeyPeople],
    logDriver: true,
    optional: true
  },
  logo: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Choose file',
        //  uploadProgressTemplate: 'customProgressBar'
      }
    }
  },
  url: {
    type: String,
    logDriver: true,
    optional: true
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
});


Organizations.attachSchema(Schemas.Organization);
Organizations.attachBehaviour('timestampable');
Meteor.isServer && Organizations.esDriver(esClient, 'organizations');
Meteor.isServer && Organizations.setMapping({
  country: {
    type: 'string'
  },
  description: {
    type: 'string'
  },
  foundingYear: {
    type: 'long'
  },
  logo: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  type: {
    type: 'string'
  }
});

Organizations.helpers({
  getProjects() {
    return Projects.find({
      organizationsId: this._id
    });
  },
  technologies() {
    return Technologies.find({
      organizationsId: this._id
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
