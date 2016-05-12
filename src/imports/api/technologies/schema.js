import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Technologies } from './technologies';
import { TechnologiesDescriptions } from '../technologies_descriptions/technologies_descriptions';

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
            name: { type: String },
            tags: { type: [String] },
            synonyms: { type: [String] },
            images: { type: [Schemas.Image] }
          }).validate({
            name,
            tags,
            synonyms,
            images: technology && technology.images || []
          });

          const description = TechnologiesDescriptions.findOne({
            technologyId: this.docId,
            $or: [
              { status: 'draft' },
              { status: 'review' }
            ]
          });

          if (!description) {
            return 'updateStatusDescriptionDraftOrReview';
          }
        }

        if (this.value === 'published') {
          new SimpleSchema({
            name: { type: String },
            tags: { type: [String] },
            synonyms: { type: [String] },
            images: { type: [Schemas.Image] },
            attachmentsId: { type: [String] },
            projectsId: { type: [String] },
            organizationsId: { type: [String] },
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
            return 'updateStatusDescriptionPublished';
          }
        }
      } catch (e) {
        console.error('[Status Validation Error]', e);
        const error = 'updateStatus' + e.details[0].name[0].toUpperCase() + e.details[0].name.substring(1);
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
    type: [Schemas.contextualDescription],
    label: 'Contextual Descriptions',
    optional: true
  },
  images: {
    type: [Schemas.Image],
    optional: true
  },
  urls: {
    type: [Schemas.Url],
    optional: true
  },
  readiness: {
    type: [Schemas.Readiness],
    optional: true,
    autoform: {
      omit: true
    }
  },
  impact: {
    type: [Schemas.Impact],
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
    type: [Schemas.Image],
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

SimpleSchema.messages({ updateStatusName: 'Technology must have a name to be promoted to review or be published' });
SimpleSchema.messages({ updateStatusTags: 'Technology must have at least one tag to be promoted to review or be published' });
SimpleSchema.messages({ updateStatusSynonyms: 'Technology must have at least one synonym to be promoted to review or be published' });
SimpleSchema.messages({ updateStatusImages: 'Technology must have at least one image to be promoted to review or be published' });
SimpleSchema.messages({ updateStatusDescriptionDraftOrReview: 'Technology must have at least one draft or reviewed description to be promoted to review or be published' });
SimpleSchema.messages({ updateStatusDescriptionPublished: 'Technology must have a published description to be published' });
SimpleSchema.messages({ updateStatusProjectsId: 'Technology must have at least one related project to be published' });
SimpleSchema.messages({ updateStatusOrganizationsId: 'Technology must have at least one related organization to be published' });
SimpleSchema.messages({ updateStatusAttachmentsId: 'Technology must have at least one related attachment to be published' });
