import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Technologies } from './technologies';
import { TechnologiesDescriptions } from '../technologies_descriptions/technologies_descriptions';
import { Projects } from '../projects/projects';
import { Organizations } from '../organizations/organizations';
import { Attachments } from '../attachments/attachments';
import { ContextualDescriptionSchema } from '/imports/api/lib/schemas/description_schema.js';
import { ImageSchema } from '/imports/api/lib/schemas/image_schema.js';
import { UrlSchema } from '/imports/api/lib/schemas/url_schema.js';
import { ReadinessSchema } from '/imports/api/lib/schemas/readiness_schema.js';
import { ImpactSchema } from '/imports/api/lib/schemas/impact_schema.js';

export const TechnologySchema = new SimpleSchema({
  techId: {
    type: String,
    label: 'techId',
    optional: true,
    esDriver: true
  },
  name: {
    type: String,
    label: 'Title',
    esDriver: true,
    logDriver: true,
    autoform: {
      afFieldInput: {
        placeholder: 'Drone Delivery'
      }
    }
  },
  synonyms: {
    type: [String],
    optional: true,
    label: 'Alternative titles',
    autoform: {
      type: 'tags'
    }
  },
  status: {
    type: String,
    esDriver: true,
    logDriver: true,
    allowedValues: ['draft', 'review', 'published'],
    autoform: {
      options: [{
        label: 'Draft',
        value: 'draft'
      }, {
        label: 'Review',
        value: 'review'
      }, {
        label: 'Published',
        value: 'published'
      }]
    },
    /**
     * TODO: Need to improve this validations.
     * This is hardcoded.
     */
    custom: function() {
      const name = this.field('name').value;
      const tags = this.field('tags').value;
      const synonyms = this.field('synonyms').value || [];
      const projectsId = this.field('projectsId').value || [];
      const organizationsId = this.field('organizationsId').value || [];
      const attachmentsId = this.field('attachmentsId').value || [];

      let technology;
      if (this.docId) {
        technology = Technologies.findOne(this.docId);
      }

      try {
        if (this.value === 'review') {
          new SimpleSchema({
            name: {
              type: String
            },
            images: {
              type: [ImageSchema],
              minCount: 1
            }
          }).validate({
            name,
            tags,
            synonyms,
            images: technology && technology.images || []
          });

          const description = TechnologiesDescriptions.findOne({
            technologyId: this.docId
          });

          if (!description) {
            return 'Technologies_updateStatusDescriptionDraftOrReview';
          }
        }

        if (this.value === 'published') {
          new SimpleSchema({
            name: {
              type: String
            },
            images: {
              type: [ImageSchema],
              minCount: 1
            },
            attachmentsId: {
              type: [String],
              minCount: 1
            },
            projectsId: {
              type: [String],
              optional: true,
              minCount: 1
            },
            organizationsId: {
              type: [String],
              minCount: 1
            },
          }).validate({
            name,
            tags,
            synonyms,
            images: technology && technology.images || [],
            attachmentsId,
            projectsId,
            organizationsId
          });

          const description = TechnologiesDescriptions.findOne({
            technologyId: this.docId,
            status: 'published'
          });

          if (!description) {
            return 'Technologies_updateStatusDescriptionPublished';
          }
        }
      } catch (e) {
        console.error('[Status Validation Error]', e);
        const error = 'Technologies_updateStatus' + e.details[0].name[0].toUpperCase() + e.details[0].name.substring(
          1);
        return error;
      }
    }
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'tags'
    }
  },
  contextualDescription: {
    type: [ContextualDescriptionSchema],
    label: 'Contextual Descriptions',
    optional: true
  },
  images: {
    type: [ImageSchema],
    optional: true
  },
  urls: {
    type: [UrlSchema],
    optional: true
  },
  readiness: {
    type: [ReadinessSchema],
    optional: true,
    autoform: {
      omit: true
    }
  },
  impact: {
    type: [ImpactSchema],
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
  organizationsId: {
    type: [String],
    optional: true,
    label: 'Related Organizations',
    autoform: {
      type: 'universe-select',
      multiple: true,
      uniPlaceholder: 'Search organizations by title...',
      options() {
        return Organizations.find().map((org) => {
          return {
            label: org.name,
            value: org._id
          };
        });
      }
    }
  },
  projectsId: {
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
  }
});

export const TechnologyReviewSchema = new SimpleSchema({
  techId: {
    type: String,
    label: 'techId',
    esDriver: true
  },
  name: {
    type: String,
    label: 'Title',
    esDriver: true,
    logDriver: true,
    autoform: {
      afFieldInput: {
        placeholder: 'Drone Delivery'
      }
    }
  },
  synonyms: {
    type: [String],
    label: 'Alternative titles',
    autoform: {
      type: 'tags'
    }
  },
  status: {
    type: String,
    esDriver: true,
    logDriver: true,
    allowedValues: ['draft', 'review', 'published'],
    autoform: {
      options: [{
        label: 'Draft',
        value: 'draft'
      }, {
        label: 'Review',
        value: 'review'
      }, {
        label: 'Published',
        value: 'published'
      }]
    }
  },
  tags: {
    type: [String],
    autoform: {
      type: 'tags'
    }
  },
  images: {
    type: [ImageSchema],
  },
  attachmentsId: {
    type: [String],
    optional: true,
  },
  organizationsId: {
    type: [String],
    optional: true,
  },
  projectsId: {
    type: [String],
    optional: true,
  }
});

SimpleSchema.messages({ Technologies_updateStatusName: 'Technology must have a name to be promoted to review or be published' });
SimpleSchema.messages({ Technologies_updateStatusTags: 'Technology must have at least one tag to be promoted to review or be published' });
SimpleSchema.messages({ Technologies_updateStatusSynonyms: 'Technology must have at least one synonym to be promoted to review or be published' });
SimpleSchema.messages({ Technologies_updateStatusImages: 'Technology must have at least one image to be promoted to review or be published' });
SimpleSchema.messages({ Technologies_updateStatusDescriptionDraftOrReview: 'Technology must have at least one description to be promoted to review' });
SimpleSchema.messages({ Technologies_updateStatusDescriptionPublished: 'Technology must have a published description to be published' });
SimpleSchema.messages({ Technologies_updateStatusProjectsId: 'Technology must have at least one related project to be published' });
SimpleSchema.messages({ Technologies_updateStatusOrganizationsId: 'Technology must have at least one related organization to be published' });
SimpleSchema.messages({ Technologies_updateStatusAttachmentsId: 'Technology must have at least one related attachment to be published' });
SimpleSchema.messages({ Technologies_updateStatusNeedAdminOrEditor: 'Only Admins and Editors can update Technology Status. Keep the previous status to save your changes'});
