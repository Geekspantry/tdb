Template.organizationsKeyPeopleList.onCreated(function() {
  this.subscribe('organizations.keyPeople', this.data.orgId);
});

Template.organizationsKeyPeopleList.helpers({
  org() {
    return Organizations.findOne({
      _id: Template.instance().data.orgId
    });
  }
});
