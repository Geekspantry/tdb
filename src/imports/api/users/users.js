import { Meteor } from 'meteor/meteor';
import { UserSchema } from './schema.js';
import { Projects }  from '/imports/api/projects/projects';

import { Images } from '/imports/api/images/images';

Meteor.users.attachSchema(UserSchema);
Meteor.users.attachBehaviour('timestampable');

Meteor.users.helpers({
  role() {
    let roles = Roles.getRolesForUser(this._id);
    return roles[0];
  },
/*  link() {
    return FlowRouter.path('usersEntry', {
      id: this._id
    });
  },*/
  identification(priority = ['fullName', 'username', 'email']) {
    let foundIdentification = 'unknown';
    _.some(priority, (p) => {
      switch (p) {
        case 'fullName':
          if (this.profile && this.profile.fullName) {
            foundIdentification = this.profile.fullName;
            return true;
          }
          return false;
        case 'username':
          if (this.username) {
            foundIdentification = this.username;
            return true;
          }
          return false;
        case 'email':
          if (this.emails && this.emails.length) {
            foundIdentification = this.emails[0].address;
            return true;
          }
          return false;
        default:
          return true;
      }
    });
    return foundIdentification;
  },
  profileImage() {
    if (this.profile && this.profile.imageId) {
      return Images.findOne({
        _id: this.profile.imageId
      });
    }
    return null;
  },
  projects() {
    return this.projectsId && Projects.find({
      _id: { $in: this.projectsId }
    });
  }
});
