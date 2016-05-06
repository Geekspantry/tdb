Template.attachmentsEntry.helpers({
  attachment: function() {
    let attachment = Attachments.findOne({
      _id: FlowRouter.getParam('id')
    });
    return attachment;
  },
});


Template.attachmentsEntry.onCreated(function() {});
