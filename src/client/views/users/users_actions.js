Template.usersActions.helpers({
  beforeRemove() {
    return function(collection, id) {
      let doc = collection.findOne(id);
      removeConfirmation(doc.emails[0].address, () => {
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

Template.usersActions.events({
  'click #btn-remove': function(e) {
    e.stopPropagation();
  }
});
