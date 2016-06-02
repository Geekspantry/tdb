import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BUG_REPORT = 'bug-report';
export const FEATURE_REQUEST = 'feature-request';
export const IM_LOST = 'im-lost';
export const OTHER_FEEDBACK = 'other-feedback';

export const FeedbackSchema = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  type: {
    type: String,
    autoform: {
      type: 'selectize',
      options: [{
        label: 'Bug report',
        value: BUG_REPORT
      }, {
        label: 'Feature Request',
        value: FEATURE_REQUEST
      }, {
        label: 'I\'m lost',
        value: IM_LOST
      }, {
        label: 'Other feedback',
        value: OTHER_FEEDBACK
      }]
    }
  },
  score: {
    type: Number,
    autoform: {
      type: 'raty',
      ratyOptions: {}
    }
  },
  message: {
    type: String,
    autoform: {
      rows: 4
    }
  },
  date: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

/*Dropdown: Bug report / Feature Request / I'm lost / Other feedback
Text Input: Message.
Placeholder for Bug report: Can you describe in detail what happened? What were you trying to accomplish?
Placeholder for Feature request: What would you like to suggest?
Placeholder for I'm Lost: How are you feeling? What were you trying to accomplish?
Placeholder for Other feedback: How are you feeling? What were you trying to accomplish?
Net promoter Score / Star rating 1-5: How are you feeling about TDB so far?
Submit Button*/
