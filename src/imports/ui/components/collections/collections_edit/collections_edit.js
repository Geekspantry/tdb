import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import 'meteor/chrismbeckett:toastr';
import { Collections } from '/imports/api/collections/collections';
import './collections_edit.html';


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
  collectionsCollection: () => Collections,
  collection() {
    return Collections.findOne({
      _id: Template.instance().data.collectionId
    });
  }
});
