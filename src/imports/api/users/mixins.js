import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { RestrictMixin } from 'meteor/ziarno:restrict-mixin';

// Not working
export const ProfileOwnerMixin = RestrictMixin.createMixin({
  condition(args) {
  	console.log('args', args)
  	console.log('userId', this.userId)

    const isProfileOwner = args && args._id === this.userId;
    console.log('isProfileOwner', isProfileOwner)

    return isProfileOwner;
  },
  error() {
    return new Meteor.Error(`${this.name}.notAuthorized`);
  }
});
