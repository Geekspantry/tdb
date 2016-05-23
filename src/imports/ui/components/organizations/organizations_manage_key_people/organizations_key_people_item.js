Template.organizationsKeyPeopleItem.events({
  'click .delete-key-people': function() {
    Meteor.call('Organizations.methods.removeKeyPeople', this.orgId, this.people._id);
  },
  'click .google-search': function() {

  }
});
