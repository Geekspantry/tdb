import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';
import { updateRoles } from '/imports/api/users/methods';
import './manage_users_roles_item.html';

Template.manageUsersRolesItem.helpers({
  roles() {
    return Meteor.roles.find({}, { sort: { hierarchy: 1 } });
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
    return 'unknown';
  },
  getRole() {
    return Roles.getRolesForUser(this._id)[0];
  }
});

Template.manageUsersRolesItem.events({
  'click .set-role': function() {
    let role = this.name;
    let userId = Template.instance().data._id;
    let name = Template.instance().data.fullName;

    if (Template.instance().data.role !== role) {
      updateRoles.call({ userId: userId, role: role }, function(err, res) {
        if (err) {
          toastr.error(err.toString());
          return;
        }
        toastr.success(`User <b>${name}</b> is now <b>${role}</b>`, 'Success!');
      });
    }
  }
});
