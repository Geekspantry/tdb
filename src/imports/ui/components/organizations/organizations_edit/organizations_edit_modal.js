AutoForm.hooks({
  updateOrganizationsModalForm: {
    onSuccess() {
      toastr.success('Technology updated successfully', 'Success');
      this.template.parent().data.onSuccess();
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.organizationsEditModal.onCreated(function() {
  this.subscribe('organizations.single', this.data.techId);
});

Template.organizationsEditModal.helpers({
  org() {
    return Organizations.findOne(Template.instance().data.techId);
  }
});
