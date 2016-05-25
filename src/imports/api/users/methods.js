/**
 * User Methods
 */

import { Meteor } from 'meteor/meteor';
import { Technologies } from '../technologies/technologies.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { UserSchema, InviteSchema } from './schema.js';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

function isProfileOwner(documentId) {
  return Meteor.userId() === documentId;
}

function isAdmin() {
  return Roles.userIsInRole(Meteor.user(), ['admin']);
}

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error('not-authorized', 'Not authorized');
}

export const invite = new ValidatedMethod({
  name: 'users.invite',
  validate: InviteSchema.validator(),
  run(doc) {
    if (!this.isSimulation) {
      this.unblock();

      checkPermissions();

      chance = new Chance();
      let password = chance.bb_pin();
      let options = {
        email: doc.email,
        password: password,
      };

      try {
        let userId = Accounts.createUser(options);
        Accounts.sendEnrollmentEmail(userId, doc.email);
        Roles.addUsersToRoles(userId, doc.roles);
        return true;
      } catch (e) {
        throw new Meteor.Error(e.toString());
      }
    }
  }
});

export const updateRole = new ValidatedMethod({
  name: 'users.updateRole',
  validate({ userId, role }) {
    check(userId, String);
    check(role, String);
  },
  run({ userId, role }) {
    checkPermissions();
    return Roles.setUserRoles(userId, role);
  }
});

export const updateImage = new ValidatedMethod({
  name: 'users.updateImage',
  validate({ userId, imageId }) {
    check(userId, String);
    check(imageId, String);
  },
  run({ userId, imageId }) {
    checkPermissions();

    return Meteor.users.update({
      _id: userId
    }, {
      $set: {
        'profile.imageId': imageId
      }
    });
  }
});

export const remove = new ValidatedMethod({
  name: 'users.remove',
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    return Meteor.users.remove({ _id: _id });
  }
});

export const updateProfile = new ValidatedMethod({
  name: 'users.updateProfile',
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (isAdmin() || isProfileOwner(_id)) {
      return Meteor.users.update({
        _id: _id
      }, modifier);
    }
    throw new Meteor.Error('not-authorized', 'Not authorized.');
  }
});

export const addProject = new ValidatedMethod({
  name: 'users.addProject',
  validate({ userId, projectId }) {
    check(userId, String);
    check(projectId, String);
  },
  run({ userId, projectId }) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'editor'])) {
      return Meteor.users.update({
        _id: userId
      }, {
        $addToSet: {
          projectsId: projectId
        }
      });
    }
    throw new Meteor.Error('not-authorized', 'Not authorized.');
  }
});

export const removeProject = new ValidatedMethod({
  name: 'users.removeProject',
  validate({ userId, projectId }) {
    check(userId, String);
    check(projectId, String);
  },
  run({ userId, projectId }) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'editor'])) {
      return Meteor.users.update({
        _id: userId
      }, {
        $pull: {
          projectsId: projectId
        }
      });
    }
    throw new Meteor.Error('not-authorized', 'Not authorized.');
  }
});
