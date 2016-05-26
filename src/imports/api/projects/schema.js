/**
 * Projects Schema
 */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Projects } from './projects';
import { Organizations } from '/imports/api/organizations/organizations';
import { Attachments } from '/imports/api/attachments/attachments';
import { StashedTechSchema } from '../shared/schemas';

export const ProjectSchema = new SimpleSchema({
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
    esDriver: true,
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
    type: [StashedTechSchema],
    optional: true,
    label: 'Technologies Stash',
  },
  collectionsCount: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  collectionsSetCount: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  technologiesStashCount: {
    type: Number,
    optional: true,
    defaultValue: 0
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
        options: () => Attachments.quickList()
      }
    }
  },
  usersId: {
    type: [String],
    logDriver: true,
    optional: true
  }
});
