import { Mongo } from 'meteor/mongo';
import { LogSchema } from './schema.js';

export const Logs = new Mongo.Collection('logs');
Logs.attachBehaviour('timestampable');
Logs.attachSchema(LogSchema);

Logs.helpers({
  user() {
    if (this.userId) {
      return Meteor.users.findOne({
        _id: this.userId
      });
    }
    return null;
  }
});
