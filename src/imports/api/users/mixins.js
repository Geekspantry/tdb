import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { RestrictMixin } from 'meteor/ziarno:restrict-mixin';

export const ProfileOwnerMixin = RestrictMixin.createMixin({
  condition(args) {
    const isAdmin = Roles.userIsInRole(this.userId, ['admin']);
    const isProfileOwner = args && args.userId === this.userId;
    return isAdmin || isProfileOwner;
  },
  error() {
    return new Meteor.Error(`${this.name}.notAuthorized`);
  }
});
