AutoForm.hooks({
  insertAttachmentFromUploadForm: {
    formToDoc(doc) {
      doc.from = 'upload';
      return doc;
    },
    onSuccess() {
      return onAddAttachmentSuccess(this.insertDoc);
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.attachmentsAddFromUpload.helpers({
  attachmentFromUpload() {
    return Template.instance().attachment.get();
  },
  fileObjFromUpload() {
    return Template.instance().fileObj.get();
  },
  isUploading() {
    return Template.instance().isUploading.get();
  },
  onUploadBegin() {
    let t = Template.instance();
    return function(fileObj) {
      t.fileObj.set(fileObj);
      t.attachment.set(false);
      t.isUploading.set(true);
    };
  },
  onUploadSuccess() {
    let t = Template.instance();
    return function(fileObj) {
      toastr.success(`The file ${fileObj.original.name} was downloaded and attached to this document.`);
      t.isUploading.set(false);
      t.fileObj.set(fileObj);
      t.attachment.set({
        name: fileObj.original.name,
        from: 'upload',
        file: {
          _id: fileObj._id,
          type: fileObj.original.type,
        }
      });
    };
  },
  onUploadCancel() {
    let t = Template.instance();
    return function(){
      t.fileObj.set(false)
      t.attachment.set(false)
      t.isUploading.set(false);
      $('#insertAttachmentFromUploadForm')[0].reset();
      toastr.success('Success', 'Upload was canceled.');
    }
  }
});

Template.attachmentsAddFromUpload.onCreated(function() {
  this.fileObj = new ReactiveVar;
  this.attachment = new ReactiveVar;
  this.isUploading = new ReactiveVar(false);
});
