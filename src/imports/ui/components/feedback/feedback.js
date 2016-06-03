import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Session } from 'meteor/session';
import 'meteor/chrismbeckett:toastr';

import './feedback.html';
import { Feedbacks } from '/imports/api/feedbacks/feedbacks';
import {
  BUG_REPORT,
  FEATURE_REQUEST,
  IM_LOST,
  OTHER_FEEDBACK
} from '/imports/api/feedbacks/schema';

Template.feedback.onCreated(function() {
  this.selectedType = new ReactiveVar();
  Session.setDefault('showFeedback', false);
});


Template.feedback.helpers({
  isOpen() {
    return !!Session.get('showFeedback');
  },
  feedbacksCollection() {
    return Feedbacks;
  },
  getPlaceholder() {
    let selectedType = Template.instance().selectedType.get();

    switch (selectedType) {
      case BUG_REPORT:
        return 'Can you describe in detail what happened? What were you trying to accomplish?';
      case FEATURE_REQUEST:
        return 'What would you like to suggest?';
      case IM_LOST:
        return 'How are you feeling? What were you trying to accomplish?';
      case OTHER_FEEDBACK:
        return 'How are you feeling? What were you trying to accomplish?';
      default:
        return '';
    }
  }
});

Template.feedback.events({
  'change [data-schema-key="type"]'(e, t) {
    let newVal = $(e.target).val();
    t.selectedType.set(newVal);
  },
  'click .spin-icon'(e, t) {
    Session.set('showFeedback', !Session.get('showFeedback'));
  }
});

AutoForm.hooks({
  insertFeedbacksForm: {
    onSuccess() {
      toastr.success('Thanks for your feedback!', 'Success');
      Session.set('showFeedback', false);
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
