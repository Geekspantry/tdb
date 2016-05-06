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
    removeConfirmationPopup(text, () => {
      CollectionsSet.methods.remove.call({_id}, (err, res) => {
        if (err) {
          removeConfirmationError();
        } else {
          removeConfirmationSuccess(`The Collection set ${name} has been removed successfully.`);
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
        console.log(err);
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
    removeConfirmationPopup(text, () => {
      Collections.methods.remove.call({_id}, (err, res) => {
        if (err) {
          removeConfirmationError();
        } else {
          removeConfirmationSuccess(`The collection ${name} has been removed successfully.`);
        }
      });
    });
  }
});
