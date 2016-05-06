AutoForm.hooks({
  insertCollectionsSetForm: {
    before: {
      method(doc) {
        doc.projectId = this.template.data.projectId;

        return doc;
      }
    },
    onSuccess() {
      toastr.success('Collection created successfully: ' + this.insertDoc.name, 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    }
  }
});
