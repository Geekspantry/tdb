Template.collectionsBoard.events({
  'click [data-action="delete-collection"]': function(event, template) {
    let el = $(event.target);
    let type = el.data('type');
    let name = this.name;
    let _id = this._id;
    let text = `Are you sure you want to delete <b>${name}</b>? You will not be able to undo this action.`;
    removeConfirmationPopup(text, () => {
      Collections.methods.remove.call({_id}, (err, res) => {
        if (err) {
          removeConfirmationError();
        } else {
          removeConfirmationSuccess(`The ${type} ${name} has been removed successfully.`);
        }
      });
    });
  },
  'click [data-action="add-sub-collection"]': function(event, template) {
    Modal.show('collectionsAdd', {
      projectId: FlowRouter.getParam('id'),
      collectionsSetId: FlowRouter.getParam('cSetId'),
      parentId: this._id
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