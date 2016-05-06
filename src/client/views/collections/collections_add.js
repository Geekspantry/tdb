AutoForm.hooks({
  insertCollectionsForm: {
    before: {
      method(doc) {
        let data = this.template.data;

        if (data.parentId) {
          doc.parentId = data.parentId;
        }

        doc.collectionsSetId = data.collectionsSetId;
        doc.projectId = data.projectId;

        return doc;
      }
    },
    onSuccess() {
      toastr.success('Collection created successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
