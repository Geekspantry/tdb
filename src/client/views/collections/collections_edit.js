AutoForm.hooks({
  updateCollectionsForm: {
    onSuccess() {
      toastr.success('Collection updated successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.collectionsEdit.onCreated(function() {
  this.subscribe('collections.single.noChildren', this.data.collectionId);
});

Template.collectionsEdit.helpers({
  collection() {
    return Collections.findOne({
      _id: Template.instance().data.collectionId
    });
  }
});
