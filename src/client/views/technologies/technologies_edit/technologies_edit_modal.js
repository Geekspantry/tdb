AutoForm.hooks({
  updateTechnologiesModalForm: {
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

Template.technologiesEditModal.onCreated(function() {
  this.subscribe('technologies.single', this.data.techId);
});

Template.technologiesEditModal.helpers({
  tech() {
    return Technologies.findOne(Template.instance().data.techId);
  }
});
