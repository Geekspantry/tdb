import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import {Attachments } from '/imports/api/attachments/attachments';
import 'meteor/chrismbeckett:toastr';

import './attachments_add_from_url.html';
AutoForm.hooks({
  insertAttachmentFromUrlForm: {
    formToDoc(doc) {
      doc.from = 'url';
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

Template.attachmentsAddFromUrl.helpers({
  attachmentsCollection() {
    return Attachments;
  },
  attachmentFromUrl() {
    return Template.instance().attachment.get();
  },
  fileObjId() {
    return Template.instance().fileObjId.get();
  },
  isDownloading() {
    return Template.instance().isDownloading.get();
  },
  onDownloadBegin() {
    let t = Template.instance();
    return function() {
      t.isDownloading.toggle();
      t.fileObjId.set(null);
    };
  },
  onDownloadError() {
    let t = Template.instance();
    return function(err) {
      toastr.error(t.getDownloadErrorMessage(err));
      t.isDownloading.toggle();
    };
  },
  onUploadError() {
    let template = Template.instance();
    return function(err) {
      toastr.error(err.toString());
      t.isDownloading.toggle();
    };
  },
  onUploadBegin() {
    let t = Template.instance();
    return function(fileId, sourceUrl) {
      t.fileObjId.set(fileId);
      t.sourceUrl.set(sourceUrl);
    };
  },
  onUploadSuccess() {
    let t = Template.instance();
    return function(fileObj) {
      toastr.success(`The file ${fileObj.original.name} was downloaded and attached to this document.`);
      t.fileObj.set(fileObj);
      t.isDownloading.toggle();
      t.attachment.set({
        name: fileObj.original.name,
        file: {
          _id: fileObj._id,
          type: fileObj.original.type,
          sourceUrl: t.sourceUrl.get()
        }
      });
    };
  }
});

Template.attachmentsAddFromUrl.onCreated(function() {
  this.fileObjId = new ReactiveVar();
  this.fileObj = new ReactiveVar;
  this.sourceUrl = new ReactiveVar;
  this.attachment = new ReactiveVar;
  this.isDownloading = new ReactiveVar(false);

  this.getDownloadErrorMessage = (err) => {
    switch (err.error) {
      case 500:
        return 'Could not read remote data from url. HEAD request is not allowed';
      case 503:
        return "Website is unavaliable to receive HEAD requests. Download can't be done";
      default:
        return 'Error trying to download the file';
    }
  };
});
