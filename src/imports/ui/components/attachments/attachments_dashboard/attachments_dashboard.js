import { Template } from 'meteor/templating';
import './attachments_dashboard.html';

Template.attachmentsDashboard.helpers({
  attachmentSelector: function() {
    return {
      collection: 'attachments'
    };
  },
});
