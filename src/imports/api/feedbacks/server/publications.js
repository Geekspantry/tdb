import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Feedbacks } from '/imports/api/feedbacks/feedbacks';

Meteor.publishComposite('feedbacks', function() {
  this.unblock();
  return {
    find() {
      this.unblock();
      return Feedbacks.find();
    },
    children: [{
      find(feedback) {
        return Meteor.users.find({
          _id: feedback.userId
        });
      }
    }]
  };
});
