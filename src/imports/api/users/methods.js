/**
 * User Methods
 */

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { RestrictMixin } from 'meteor/ziarno:restrict-mixin';

import {
  UserSchema,
  InviteSchema
} from './schema.js';

import {
  ValidatedMethodUpdateSchema,
  ValidatedMethodRemoveSchema
} from '../shared/schemas';

function isOwner(_id) {
  return _id === this.userId;
}

/**
 * Invite User
 *
 * Permissions: [admin]
 */
export const invite = new ValidatedMethod({
  name: 'users.invite',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'users.invite.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'users.invite.notAuthorized',
    }
  },
  validate: InviteSchema.validator(),
  run(doc) {
    if (!this.isSimulation) {
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
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'users.updateRole.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'users.updateRole.notAuthorized',
    }
  },
  validate({ userId, role }) {
    check(userId, String);
    check(role, String);
  },
  run({ userId, role }) {
    return Roles.setUserRoles(userId, role);
  }
});

/**
 * Update Image
 */
export const updateImage = new ValidatedMethod({
  name: 'users.updateImage',
  mixins: [LoggedInMixin],
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'users.updateImage.notAuthorized',
    }
  },
  checkLoggedInError: {
    error: 'users.updateImage.notLoggedIn',
  },
  validate({ userId, imageId }) {
    check(userId, String);
    check(imageId, String);
  },
  run({ userId, imageId }) {
    if (!isOwner())
      throw new Meteor.Error('users.updateImage.notAuthorized');

    return Meteor.users.update({
      _id: userId
    }, {
      $set: {
        'profile.imageId': imageId
      }
    });
  }
});

/**
 * Remove User
 */
export const remove = new ValidatedMethod({
  name: 'users.remove',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'users.remove.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'users.remove.notAuthorized',
    }
  },
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    return Meteor.users.remove(_id);
  }
});

/**
 * Update Profile
 */
export const updateProfile = new ValidatedMethod({
  name: 'users.updateProfile',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'users.updateProfile.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'users.updateProfile.notAuthorized',
    }
  },
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (!isOwner())
      throw new Meteor.Error('users.updateProfile.notAuthorized');

    return Meteor.users.update(_id, modifier);
  }
});

/**
 * Add Project to User
 */
export const addProject = new ValidatedMethod({
  name: 'users.addProject',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'users.addProject.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'users.addProject.notAuthorized',
    }
  },
  validate({ userId, projectId }) {
    check(userId, String);
    check(projectId, String);
  },
  run({ userId, projectId }) {
    return Meteor.users.update({
      _id: userId
    }, {
      $addToSet: {
        projectsId: projectId
      }
    });
  }
});

/**
 * Remove Project from User
 */
export const removeProject = new ValidatedMethod({
  name: 'users.removeProject',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'users.removeProject.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'users.removeProject.notAuthorized',
    }
  },
  validate({ userId, projectId }) {
    check(userId, String);
    check(projectId, String);
  },
  run({ userId, projectId }) {
    return Meteor.users.update({
      _id: userId
    }, {
      $pull: {
        projectsId: projectId
      }
    });
  }
});
