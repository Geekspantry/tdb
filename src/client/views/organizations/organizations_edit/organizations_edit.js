AutoForm.hooks({
  updateOrganizationForm: {
    onSuccess() {
      toastr.success('Organization updated successfully', 'Success');
      FlowRouter.go('organizations.entry', {id: FlowRouter.getParam('id')});
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.organizationsEdit.onCreated(function() {
  this.subscribe('organizations.single', FlowRouter.getParam('id'));
  this.subscribe('projects.quickList');
  this.subscribe('technologies.quickList');
  this.subscribe('attachments.quickList');
});

Template.organizationsEdit.helpers({
  organization() {
    return Organizations.findOne(FlowRouter.getParam('id'));
  }
});
