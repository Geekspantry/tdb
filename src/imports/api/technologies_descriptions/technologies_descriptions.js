import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { TechnologyDescriptionSchema } from './schema.js';

export const TechnologiesDescriptions = new Mongo.Collection('technologies_descriptions');

TechnologiesDescriptions.attachSchema(TechnologyDescriptionSchema);
TechnologiesDescriptions.attachBehaviour('timestampable');

TechnologiesDescriptions.helpers({
  modifiedAt() {
    return this.updatedAt || this.createdAt;
  },
  modifiedByUser() {
    return Meteor.users.findOne(this.updatedBy || this.createdBy);
  }
});
