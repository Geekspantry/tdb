import { Template } from 'meteor/templating';
import { Files } from '/imports/api/files/files';

Template.smartInputFile.events({
  'change .browse': function(e, t) {
    let file = e.target.files[0];

    t.file.set(file);
    t.onFileSelected(file);

    if (t.uploadOnFileSelected()) {
      t.startUpload(file);
    }
  },

  'click .cancel': function(e, t) {
    t.file.set(undefined);
    t.fileObj.set(undefined);
    t.onUploadCancel();
  },

  'click .btn-upload': function(e, t) {
    let file = t.file.get();
    t.startUpload(file);
  }
});

Template.smartInputFile.helpers({
  btnFileText() {
    return Template.instance().btnFileText();
  },
  fileNameText() {
    return Template.instance().fileNameText();
  },
  isFileSelected() {
    return Template.instance().isFileSelected();
  },
  uploadOnFileSelected() {
    return Template.instance().uploadOnFileSelected();
  },
  isUploading() {
    return Template.instance().isUploading.get();
  }
});

Template.smartInputFile.onCreated(function() {
  this.state = new ReactiveVar;
  this.file = new ReactiveVar; // File from the client
  this.fileObj = new ReactiveVar; // File from the server
  this.isUploading = new ReactiveVar;

  this.autorun(() => {
    let fileObj = this.fileObj.get();
    if (fileObj) {
      this.subscribe('files.single', this.fileObj.get()._id);

      // The method hasStored check when the file
      // succefully uploaded.
      let uploadedFile = Files.findOne(fileObj._id);
      if (uploadedFile && uploadedFile.hasStored('files')) {
        this.onUploadSuccess(uploadedFile);
      }
    }
  });

  // =======================================
  // ============== Helpers ================
  // =======================================
  this.isFileSelected = () => {
    return this.file.get() !== undefined;
  };

  this.uploadOnFileSelected = () => {
    return !!this.data.uploadOnFileSelected;
  }

  this.btnFileText = () => {
    return this.isFileSelected() ? 'Change file...' : 'Browse file...';
  };

  this.fileNameText = () => {
    return this.isFileSelected() ? this.file.get().name : '';
  };

  this.startUpload = (file) => {
    this.isUploading.set(true);
    Files.insert(file, (err, fileObj) => {
      if (err) return this.onUploadError(err);

      // fileObj is just a reference, doesn't mean
      // that is uploaded.
      this.fileObj.set(fileObj);
      return this.onUploadBegin(fileObj);
    });
  }

  // =======================================
  // ============ Callbacks ================
  // =======================================
  this.onFileSelected = (file) => {
    this.data.onFileSelected && this.data.onFileSelected(file);
  };

  this.onUploadBegin = (fileObj) => {
    $('.btn-upload').button('loading');
    this.isUploading.set(true);
    this.data.onUploadBegin && this.data.onUploadBegin(fileObj);
  };

  this.onUploadError = (err) => {
    $('.btn-upload').button('reset');
    this.isUploading.set(false);
    this.data.onUploadError && this.data.onUploadError(err);
  };

  this.onUploadSuccess = (fileObj) => {
    $('.btn-upload').button('reset');
    this.isUploading.set(false);
    this.data.onUploadSuccess && this.data.onUploadSuccess(fileObj);
  };

  this.onUploadCancel = () => {
    $('.btn-upload').button('reset');
    this.isUploading.set(false);
    this.data.onUploadCancel && this.data.onUploadCancel();
  };
});
