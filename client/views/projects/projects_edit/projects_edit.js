AutoForm.hooks({
  updateProjectsForm: {
    onSuccess() {
      toastr.success('Project updated successfully', 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.projectsEdit.onCreated(function() {
  this.subscribe('projects.single', FlowRouter.getParam('id'));
  this.subscribe('technologies.quickList');
  this.subscribe('organizations.quickList');
});

Template.projectsEdit.helpers({
  organization() {
    return Projects.findOne(FlowRouter.getParam('id'));
  }
});
