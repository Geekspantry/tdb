/**
 * data: {String} _id The _id from a given technlogy.
 */

import { Template } from 'meteor/templating';
import { FS } from 'meteor/cfs:gridfs';
import { Images} from '/imports/api/images/images';

import './technologies_images_input.html';

Template.technologiesImagesInput.events({
  'change .browse': function(e, t) {
    let file = e.target.files[0];

    t.file.set(file);
    t.startUpload(file);
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

Template.technologiesImagesInput.helpers({
  uploadOnFileSelected() {
    return Template.instance().uploadOnFileSelected();
  },
  isUploading() {
    return Template.instance().isUploading.get();
  }
});

Template.technologiesImagesInput.onCreated(function() {
  this.state = new ReactiveVar;
  this.file = new ReactiveVar; // File from the client
  this.fileObj = new ReactiveVar; // File from the server
  this.isUploading = new ReactiveVar;

  this.autorun(() => {
    let fileObj = this.fileObj.get();
    if (fileObj) {
      this.subscribe('images.single', this.fileObj.get()._id);

      let uploadedFile = Images.findOne(fileObj._id, { fields: { copies: 1 } });
      if (uploadedFile && uploadedFile.hasStored('images')) {
        this.onUploadSuccess(uploadedFile);
      }
    }
  });

  // =======================================
  // ============== Helpers ================
  // =======================================
  this.startUpload = (file) => {
    this.isUploading.set(true);
    Images.insert(file, (err, fileObj) => {
      if (err) return this.onUploadError(err);

      // fileObj is just a reference, doesn't mean
      // that is uploaded.
      this.fileObj.set(fileObj);
      return this.onUploadBegin(fileObj);
    });
  };

  // =======================================
  // ============ Callbacks ================
  // =======================================
  this.onFileSelected = (file) => {
    this.data.onFileSelected && this.data.onFileSelected(file);
  };

  this.onUploadBegin = (fileObj) => {
    this.isUploading.set(true);
    this.data.onUploadBegin && this.data.onUploadBegin(fileObj);
  };

  this.onUploadError = (err) => {
    this.isUploading.set(false);
    this.data.onUploadError && this.data.onUploadError(err);
  };

  this.onUploadSuccess = (fileObj) => {
    this.isUploading.set(false);
    this.data.onUploadSuccess && this.data.onUploadSuccess(fileObj);
  };

  this.onUploadCancel = () => {
    this.isUploading.set(false);
    this.data.onUploadCancel && this.data.onUploadCancel();
  };
});
