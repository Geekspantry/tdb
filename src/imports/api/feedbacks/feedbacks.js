import { Mongo } from 'meteor/mongo';

import { FeedbackSchema } from './schema.js';


export const Feedbacks = new Mongo.Collection('feedbacks');

Feedbacks.attachSchema(FeedbackSchema);
Feedbacks.attachBehaviour('timestampable');

Feedbacks.helpers({
  user() {  // refactor to --> projects
    return Meteor.users.findOne({
      _id: this.userId
    });
  },
});
