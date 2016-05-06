Template.attachmentsActions.helpers({
  beforeRemove() {
    return function(collection, id) {
      let doc = collection.findOne(id);
      removeConfirmation(doc.name, () => {
        this.remove();
      });
    };
  },
  onSuccess() {
    return function() {
      removeSuccess();
    };
  },
  onError() {
    return function() {
      removeError();
    };
  }
});


Template.attachmentsActions.events({
  'click #btn-edit': function(e) {
    e.stopPropagation();
    FlowRouter.go('attachmentsEdit', {id: this._id});
  },
  'click #btn-remove': function(e) {
    e.stopPropagation();
  }
});
