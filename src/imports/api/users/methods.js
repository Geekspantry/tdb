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

/**
 * Invite User
 *
 * Permissions: [admin]
 */
export const invite = new ValidatedMethod({
  name: 'users.invite',
  validate: InviteSchema.validator(),
  run(doc) {
    if (!this.isSimulation) {
      if (isAdmin()) {
        this.unblock();
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
    return true;
  }
});

/**
 * Update Role
 *
 * Permissions: [admin]
 */
export const updateRole = new ValidatedMethod({
  name: 'users.updateRole',
  validate({ userId, role }) {
    check(userId, String);
    check(role, String);
  },
  run({ userId, role }) {
    if (isAdmin()) {
      return Roles.setUserRoles(userId, role);
    }
    throw new Meteor.Error('not-authorized', 'users.updateRole.not-authorized');
  }
});

/**
 * Update Image
 *
 * Permissions: [admin, owner]
 */
export const updateImage = new ValidatedMethod({
  name: 'users.updateImage',
  validate({ userId, imageId }) {
    check(userId, String);
    check(imageId, String);
  },
  run({ userId, imageId }) {
    if (isAdmin() || isProfileOwner(userId)) {
      return Meteor.users.update({
        _id: userId
      }, {
        $set: {
          'profile.imageId': imageId
        }
      });
    }
    throw new Meteor.Error('not-authorized', 'users.updateImage.not-authorized');
  }
});

/**
 * Remove User
 *
 * Permissions: [admin]
 */
export const remove = new ValidatedMethod({
  name: 'users.remove',
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    if (isAdmin()) {
      return Meteor.users.remove({ _id: _id });
    }
    throw new Meteor.Error('not-authorized', 'users.remove.not-authorized');
  }
});

/**
 * Update Profile
 *
 * Permissions: [admin, owner]
 */
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

/**
 * Add Project to User
 *
 * Permissions: [admin, owner]
 */
export const addProject = new ValidatedMethod({
  name: 'users.addProject',
  validate({ userId, projectId }) {
    check(userId, String);
    check(projectId, String);
  },
  run({ userId, projectId }) {
    if (isAdmin() || isProfileOwner(userId)) {
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

/**
 * Remove Project from User
 *
 * Permissions: [admin, owner]
 */
export const removeProject = new ValidatedMethod({
  name: 'users.removeProject',
  validate({ userId, projectId }) {
    check(userId, String);
    check(projectId, String);
  },
  run({ userId, projectId }) {
    if (isAdmin() || isProfileOwner(userId)) {
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
