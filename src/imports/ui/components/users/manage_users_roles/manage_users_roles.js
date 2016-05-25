import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';
import './manage_users_roles.html';

Template.manageUsersRoles.helpers({
  users() {
    let result = SearchSources.userSearch.getTransformedData();
    return result;
  },
  getOptions() {
    return {
      types: ['users']
    };
  },
  getRolesForUser() {
    return Roles.getRolesForUser(this._id)[0];
  }
});

Template.manageUsersRoles.onCreated(function() {
  this.subscribe('Users.roles');
});
