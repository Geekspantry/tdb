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
