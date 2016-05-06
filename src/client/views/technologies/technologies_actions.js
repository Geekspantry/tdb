Template.technologiesActions.helpers({
  beforeRemove() {
    return function(collection, id) {
      let doc = collection.findOne(id);
      removeConfirmation(doc.name, () => {
        this.remove();
      });
    };
  },
  onSuccess() {
    return function(result) {
      removeSuccess();
    };
  },
  onError() {
    return function() {
      removeError();
    };
  }
});

Template.technologiesActions.events({
  'click #btn-edit': function(e) {
    e.stopPropagation();
    FlowRouter.go('technologies.edit', {id: this._id});
  },
  'click #btn-remove': function(e) {
    e.stopPropagation();
  }
});
