import { Mongo } from 'meteor/mongo';

import { TechnologySchema } from './schema.js';
import { TechnologiesDescriptions } from '../technologies_descriptions/technologies_descriptions.js';
import { DESCRIPTION_STATUS } from '../technologies_descriptions/schema';
import { Projects} from '../projects/projects';

export const Technologies = new Mongo.Collection('technologies');

Technologies.attachSchema(TechnologySchema);
Technologies.attachBehaviour('timestampable');

Technologies.helpers({
  descriptions() {
    return TechnologiesDescriptions.find({
      technologyId: this._id
    });
  },
  organizations() {
    return Organizations.find({
      _id: {
        $in: this.organizationsId || []
      }
    });
  },
  projects() {
    return Projects.find({
      _id: {
        $in: this.projectsId || []
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
  getPublishedDescription() {
    const publishedDescription = TechnologiesDescriptions.findOne({
      technologyId: this._id,
      status: DESCRIPTION_STATUS.PUBLISHED
    });

    if (!publishedDescription) {
      return {
        shortText: "There's no published description for this technology",
        longText: "There's no published description for this technology"
      };
    }

    return publishedDescription;
  },
  getShowcasedImage() {
    if (!this.images) return false;
    this.images = this.images || [];
    return _.find(this.images, function(desc) {
      return desc && desc.showcased;
    }) || {};
  },
  getCollections() {
    return Collections.find({
      technologiesId: this._id
    });
  }
});
