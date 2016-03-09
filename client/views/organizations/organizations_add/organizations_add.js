AutoForm.hooks({
  insertOrganizationForm: {
    onSuccess() {
        toastr.success('Organization created successfully: ' + this.insertDoc.name, 'Success');
        FlowRouter.go('organizations.dashboard');
      },
      onError(formType, error) {
        toastr.error(error.toString(), 'Error');
      },
  }
});

Template.organizationsAdd.events({
  'click .btn-create-attachment': function(e){
    e.preventDefault();
    Modal.show('attachmentsAddModal');
  }
});


Template.organizationsAdd.onCreated(function() {
	this.subscribe('projects.quickList');
  this.subscribe('technologies.quickList');
  this.subscribe('attachments.quickList');
});