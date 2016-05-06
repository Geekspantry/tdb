Organizations = new Mongo.Collection('organizations');

/**
 *
 * Schema
 *
 */
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
    logDriver: true
  },
  country: {
    type: String,
    esDriver: true,
    logDriver: true,
    autoform: {
      type: 'countryFlags'
    }
  },
  type: {
    type: String,
    esDriver: true,
    logDriver: true,
    allowedValues: ['academic', 'non-profit', 'governamental', 'private'],
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
  urls: {
    type: [Schemas.Url],
    logDriver: true,
    optional: true
  },
/*  projectsId: {
    type: [String],
    optional: true,
    label: 'Related Projects',
    autoform: {
      type: 'universe-select',
      multiple: true,
      uniPlaceholder: 'Search projects by title...',
      options() {
        return Projects.find().map((project) => {
          return {
            label: project.name,
            value: project._id
          };
        });
      }
    }
  },*/
/*  technologiesId: {
    type: [String],
    optional: true,
    label: 'Related Technologies',
    autoform: {
      type: 'universe-select',
      multiple: true,
      uniPlaceholder: 'Search technology by title...',
      options() {
        return Technologies.find().map((tech) => {
          return {
            label: tech.name,
            value: tech._id
          };
        });
      }
    }
  },*/
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


/**
 *
 * Behaviours
 *
 */
Organizations.attachSchema(Schemas.Organization);
Organizations.attachBehaviour('timestampable');
Meteor.isServer && Organizations.esDriver(esClient, 'organizations');


/**
 *
 * Helpers
 *
 */
Organizations.helpers({
/*  getProjects() {
    return Projects.find({
      _id: {
        $in: this.projectsId || []
      }
    });
  },*/
  getProjects() {
    return Projects.find({
      organizationsId: this._id
    });
  },
/*  technologies() {
    return Technologies.find({
      _id: {
        $in: this.technologiesId || []
      }
    });
  },*/
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
