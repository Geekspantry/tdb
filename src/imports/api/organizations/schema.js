import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Organizations } from './organizations';
import { Attachments } from '/imports/api/attachments/attachments';
import { Images } from '/imports/api/images/images.js';

export const KeyPeopleSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  role: {
    type: String
  },
  image: {
    type: String,
    autoform: {
      type: 'url'
    }
  }
});

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
    type: [KeyPeopleSchema],
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
        collection: 'images',
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
        options: () => Attachments.quickList()
      }
    }
  },
});
