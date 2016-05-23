Template.manageOrgProjectsItem.helpers({
  inProject() {
    let organizationId = Template.instance().data.organizationId;
    let inProject = Organizations.findOne({
      _id: organizationId,
      projectsId: this._id
    });

    return inProject;
  },
});

Template.manageOrgProjectsItem.events({
  'click .add-project': function(e, t) {
    Meteor.call('Organizations.methods.addProject', t.data.organizationId, this._id, function(error) {
      if (error) {
        return toastr.error(error.toString(), 'Error');
      }
      return toastr.success('Project linked with organization successfuly', 'Success');
    });
  },
  'click .remove-project': function(e, t) {
    Meteor.call('Organizations.methods.removeProject', t.data.organizationId, this._id, function(error) {
      if (error) {
       return toastr.error('Error', error.toString());
      }
      return toastr.success('Project unlinked with organization successfuly', 'Success');
    });
  }
});
