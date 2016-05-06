Template.organizationsActions.helpers({
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

Template.organizationsActions.events({
  'click #btn-edit': function(e) {
    e.stopPropagation();
    FlowRouter.go('organizations.edit', {id: this._id});
  },
  'click #btn-remove': function(e) {
    e.stopPropagation();
  }
});
