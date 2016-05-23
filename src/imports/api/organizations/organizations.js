import { Mongo } from 'meteor/mongo';

import { OrganizationSchema } from './schema.js';
import { Projects } from '../projects/projects';

export const Organizations = new Mongo.Collection('organizations');

Organizations.attachSchema(OrganizationSchema);
Organizations.attachBehaviour('timestampable');

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
    return null;
  }
});
