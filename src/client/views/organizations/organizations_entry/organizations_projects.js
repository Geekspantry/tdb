Template.orgProjects.helpers({ 

});

Template.orgProjects.events({
  'click #manage-org-projects': function() {
    Modal.show('manageOrgProjects', {
      organizationId: FlowRouter.getParam('id')
    });
  }
});


