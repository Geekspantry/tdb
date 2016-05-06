AutoForm.hooks({
  updateAttachmentsForm: {
    onSuccess() {
      toastr.success('Attachment updated successfully', 'Success');
      if (this.template.data && typeof this.template.data.onSuccess === 'function') {
        this.template.data.onSuccess();
      }
      //this.template.parent().data.onSuccess();
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.attachmentsEdit.onCreated(function() {
  this.subscribe('attachments.single', this.data.attachmentId);
});

Template.attachmentsEdit.helpers({
  attachment() {
    return Attachments.findOne(Template.instance().data.attachmentId);
  }
});
