import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import popups from '../../common/popups/popups';
import { CollectionsSet } from '/imports/api/collections_set/collections_set';
import { remove as removeCollectionSet } from '/imports/api/collections_set/methods.js';
import { remove, copy } from '/imports/api/collections/methods.js';
import './collections_set_item.html';

Template.collectionsSetItem.helpers({
  getProjectId() {
    return FlowRouter.getParam('id');
  }
});

Template.collectionsSetItem.events({
  'click [data-action="delete-collection-set"]': function(event, template) {
    let name = this.name;
    let _id = this._id;
    let text = `Are you sure you want to delete <b>${name}</b>? You will not be able to undo this action.`;
    popups.removeConfirmation(text, () => {
      removeCollectionSet.call({_id}, (err, res) => {
        if (err) {
          toastr.error(err.toString(), 'Error');
        } else {
          toastr.success(`<b>${name}</b> deleted successfully.`, 'Success');
        }
      });
    });
  },
  'click [data-action="edit-collection"]': function(event, template) {
    event.preventDefault();
    Modal.show('collectionsEdit', {
      collectionId: this._id
    });
  },
  'click [data-action="copy-collection"]': function(event, template) {
    event.preventDefault();
    let _id = this._id;
    copy.call({
      _id
    }, (err, res) => {
      if (err) {
        toastr.error('Could not copy the collection', 'Error');
      } else {
        toastr.success('Collection copied!', 'Success');
      }
    });
  },
  'click [data-action="delete-collection"]': function(event, template) {
    event.preventDefault();
    let name = this.name;
    let _id = this._id;
    let text = `Are you sure you want to delete <b>${name}</b>? You will not be able to undo this action.`;
    popups.removeConfirmation(text, () => {
      remove.call({_id}, (err, res) => {
        if (err) {
          toastr.error(err.toString(), 'Error');
        } else {
          toastr.success(`<b>${name}</b> deleted successfully.`, 'Success');
        }
      });
    });
  }
});
