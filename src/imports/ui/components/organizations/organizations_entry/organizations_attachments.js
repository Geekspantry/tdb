Template.orgAttachments.helpers({
  attachments() {
    return Attachments.find({});
  },

});

Template.orgAttachments.events({
  'click #manage-org-attachments': function() {
    Modal.show('manageOrgAttachments', {
      organizationId: FlowRouter.getParam('id')
    });
  }
});
