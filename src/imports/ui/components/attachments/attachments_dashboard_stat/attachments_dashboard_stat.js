import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Attachments } from '/imports/api/attachments/attachments';

import './attachments_dashboard_stat.html';

Template.attachmentsDashboardStat.onCreated(function() {
  this.subscribe('last-attachment-added');
  this.subscribe('attachments-counter');
});

Template.attachmentsDashboardStat.helpers({
  totalCount() {
    return Counts.get('attachments-total');
  },
  lastAttachmentAdded() {
    return Attachments.findOne({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});
