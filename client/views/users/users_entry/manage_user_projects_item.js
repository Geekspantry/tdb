Template.manageUserProjectsItem.helpers({
  inProject() {
    let userId = Template.instance().data.userId;
    let inProject = Meteor.users.findOne({
      _id: userId,
      projectsId: this._id
    });

    return inProject;
  },
});

Template.manageUserProjectsItem.events({
  'click .add-project': function(e, t) {
    Meteor.call('users/addProject', t.data.userId, this._id);
  },
  'click .remove-project': function(e, t) {
    Meteor.call('users/removeProject', t.data.userId, this._id);
  }
});
