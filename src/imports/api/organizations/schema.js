import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Organizations } from './organizations';

export const OrganizationSchema = new SimpleSchema({
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
