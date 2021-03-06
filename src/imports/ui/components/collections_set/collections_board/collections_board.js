import { Template } from 'meteor/templating';
import popups from '../../common/popups/popups';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Technologies } from '/imports/api/technologies/technologies';
import { remove } from '/imports/api/collections/methods.js';
import './collections_board.html';

Template.collectionsBoard.events({
  'click [data-action="delete-collection"]'(event, template) {
    let el = $(event.target);
    let type = el.data('type');
    let name = this.name;
    let _id = this._id;
    let text = `Are you sure you want to delete <b>${name}</b>? You will not be able to undo this action.`;
    popups.removeConfirmation(text, () => {
     remove.call({_id}, (err, res) => {
        if (err) {
          toastr(err.toString(), 'Error');
        } else {
          toastr.success(`<b>${name}</b> has been removed successfully.`, 'Success');
        }
      });
    });
  },
  'click [data-action="add-sub-collection"]'(event, template) {
    Modal.show('collectionsAdd', {
      projectId: FlowRouter.getParam('id'),
      collectionsSetId: FlowRouter.getParam('cSetId'),
      parentId: this._id
    });
  },
  'click [data-action="edit-collection"]'(event, template) {
    event.preventDefault();
    Modal.show('collectionsEdit', {
      collectionId: this._id
    });
  }
});
Template.collectionsBoard.helpers({
  getDrake() {
    return Template.instance().data.drake;
  },
});

Template.subCollectionsDragArea.onRendered(function() {
  let drake = Template.instance().data.drake;
  drake.containers.push(this.find('.sub-collection-drag-area'));
});

Template.subCollectionsDragArea.helpers({
  getTechnology() {
    return Technologies.findOne({
      _id: this.valueOf()
    });
  }
});

Template.deleteDragArea.onRendered(function() {
  let drake = Template.instance().data.drake;
  drake.containers.push(this.find('.delete-drag-area'));
});
