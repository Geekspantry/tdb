import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Projects } from '/imports/api/projects/projects';

export const DescriptionSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  },
  updatedBy: {
    type: String,
    optional: true,
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  status: {
    type: String,
    allowedValues: ['draft', 'review', 'published'],
    autoform: {
      sortField: ['a'],
      options() {
        return [{
          s: 'a',
          label: 'Draft',
          value: 'draft',
        }, {
          s: 'b',
          label: 'Review',
          value: 'review',
        }, {
          s: 'c',
          label: 'Published',
          value: 'published',
        }];
      }
    }
  },
  longText: {
    type: String,
    autoform: {
      type: 'markdownEditor',
    }
  },
  shortText: {
    type: String,
    optional: true,
    max: 140,
    autoform: {
      type: 'textarea',
      rows: 3
    }

  },
  applications: {
    type: [String],
    optional: true,
    autoform: {
      omit: true
    }
  },
  benefits: {
    type: [String],
    optional: true,
    autoform: {
      omit: true
    }
  }
});


export const ContextualDescriptionSchema = new SimpleSchema([
  DescriptionSchema.pick(['userId', 'createdAt', 'applications', 'applications.$', 'benefits', 'benefits.$',
    'longText'
  ]), {
    projectId: {
      type: String,
      autoform: {
        type: 'universe-select',
        afFieldInput: {
          options: () => Projects.quickList()
        }
      }
    }
  }
]);
