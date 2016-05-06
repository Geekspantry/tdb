Template.userCard.events({
  'click .link': function(e, t) {
    //FlowRouter.go(t.data.link);
  },
  'click .edit': function(e) {
    e.preventDefault();
    Modal.show('editInformation', {
      userId: this._id
    });
  },
  'click .delete': function(e, t) {
    e.preventDefault();
    confirmDeleteUser(() => {
      Meteor.call('Users.methods.remove', this._id, (err, res) => {
        if (err) {
          removeError();
        }
        removeSuccess();
        t.isDeleted.set(true);
      });
    });
  },
  'click .change-permissions': function() {
    Modal.show('manageUserProjects', {
      userId: this._id
    });
  }
});

Template.userCard.onCreated(function() {
  this.isDeleted = new ReactiveVar(false);

  // TODO: Need fix this sub
  this.subscribe('users.single', this.data._id);
});
Template.userCard.helpers({
  user() {
    return Meteor.users.findOne({
      _id: Template.instance().data._id
    });
  },
  isDeleted() {
    return Template.instance().isDeleted.get();
  }
});
