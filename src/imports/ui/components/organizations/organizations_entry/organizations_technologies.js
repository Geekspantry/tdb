Template.orgTechnologies.events({
  'click #manage-org-technologies': function() {
    Modal.show('manageOrgTechnologies', {
      organizationId: FlowRouter.getParam('id')
    });
  }
});


