Template.manageUserRoleItem.helpers({
  roles() {
    return Meteor.roles.find({}, {sort: {hierarchy: 1}});
  },
  btnColor() {
    if (Template.instance().data.role === this.name) {
      return ColorMap.users.role[this.name];
    }
    return 'default';
  },
  getIcon() {
    return Icons.roles[this.name] || Icons.roles.default;
  },
  getDisplayName() {
    if (this.username) {
      return this.username;
    }
    if (this.emails && this.emails.length) {
      return this.emails[0].address;
    }
    if (this.fullName) {
      return this.fullName;
    }
  },
  getRole() {
    return Roles.getRolesForUser(this._id)[0];
  }
});

Template.manageUserRoleItem.events({
  'click .set-role': function() {
    if (Template.instance().data.role !== this.name) {
      Meteor.call('Users.updateRoles', Template.instance().data._id, this.name, function(err, res) {
        if (err) {
          return toastr.error(err.toString());
        }
        toastr.success('Success!');
      });
    }
  }
});



