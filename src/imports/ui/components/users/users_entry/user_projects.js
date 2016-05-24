Template.userProjects.events({
  'click #manage-user-projects': function() {
    Modal.show('manageUserProjects', {
      userId: FlowRouter.getParam('id')
    });
  }
});


