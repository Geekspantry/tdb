import { Mongo } from 'meteor/mongo';

import { AttachmentSchema } from './schema.js';
import { Projects} from '../projects/projects';
import { Technologies} from '../technologies/technologies';
import { Organizations} from '../organizations/organizations';


export const Attachments = new Mongo.Collection('attachments');

Attachments.helpers({
  isFromWeb() {
    return this.from === 'web';
  },
  getCreatedBy() {
    return Meteor.users.findOne({
      _id: this.createdBy
    });
  },
  relatedProjects() {
    return Projects.find({
      attachmentsId: {
        $in: [this._id]
      }
    });
  },
  relatedTechnologies() {
    return Technologies.find({
      attachmentsId: {
        $in: [this._id]
      }
    });
  },
  relatedOrganizations() {
    return Organizations.find({
      attachmentsId: {
        $in: [this._id]
      }
    });
  },

});

Attachments.attachSchema(AttachmentSchema);
Attachments.attachBehaviour('timestampable');
