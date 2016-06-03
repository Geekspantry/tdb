import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';


import { FeedbackSchema } from './schema.js';
import { Feedbacks } from './feedbacks.js';

/**
 * Insert Feedback
 *
 * Permissions: [loggedIn]
 */
export const insert = new ValidatedMethod({
  name: 'feedbacks.insert',
  validate: FeedbackSchema.validator(),
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'feedbacks.insert.notLoggedIn',
  },
  run(doc) {
  	doc.userId = Meteor.userId();
  	doc.date = new Date();
  	
    return Feedbacks.insert(doc);
  }
});

