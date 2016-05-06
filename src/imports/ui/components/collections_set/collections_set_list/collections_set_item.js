import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import popups from '../../common/popups/popups';

import './collections_set_item';

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
      CollectionsSet.methods.remove.call({_id}, (err, res) => {
        if (err) {
          popups.removeError();
        } else {
          popups.removeSuccess(`The Collection set ${name} has been removed successfully.`);
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
    Collections.methods.copy.call({
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
      Collections.methods.remove.call({_id}, (err, res) => {
        if (err) {
          popups.removeError();
        } else {
          popups.removeSuccess(`The collection ${name} has been removed successfully.`);
        }
      });
    });
  }
});
