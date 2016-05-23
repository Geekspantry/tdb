/**
 * User Methods
 */

import { Projects } from './projects';
import { Technologies } from '../technologies/technologies.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { ProjectSchema } from './schema.js';
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
  run({ email }) {
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
});

export const updateRole = new ValidatedMethod({
  name: 'users.updateRole',
  validate({ userId, role }) {
    check(targetUserId, String);
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
  run({ userId }) {
    return Meteor.users.remove({ _id: userId });
  }
});

export const update = new ValidatedMethod({
  name: 'users.update',
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (isAdmin() || isProfileOwner(_id)) {
      return Meteor.users.update({
        _id: documentId
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
    if (Roles.userIsInRole(Meteor.userId, ['admin', 'editor'])) {
      return Meteor.users.update({
        _id: targetUserId
      }, {
        $addToSet: {
          projectsId: projectId
        }
      });
    }
    throw new Meteor.Error('not-authorized', 'Not authorized.');
  }
});


if (Meteor.isServer) {
  Meteor.methods({
    /*    inviteUser(doc) {
          if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), ['admin', 'god'])) {
            throw new Meteor.Error(403, 'Access denied');
          }
          this.unblock();
          check(doc, InviteSchema);

          chance = new Chance();
          let password = chance.bb_pin();
          let options = {
            email: doc.email,
            password: password,
          };

          try {
            let userId = Accounts.createUser(options);
            Accounts.sendEnrollmentEmail(userId, doc.email);
            Roles.addUsersToRoles(userId, doc.roles);    'Users.updateRoles': function(targetUserId, role) {
          check(targetUserId, String);
          check(role, String);
          let loggedInUser = Meteor.user();

          if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin', 'god'])) {
            throw new Meteor.Error(403, 'Access denied');
          }
          Roles.setUserRoles(targetUserId, role);
        }
            return true;
          } catch (e) {
            throw new Meteor.Error(e.toString());
          }
        },*/
    /**
     * update a user's permissions
     *
     * @param {Object} targetUserId Id of user to update
     * @param {Array} roles User's new permissions
     * @param {String} group Company to update permissions for
     */
    /*    'Users.updateRoles': function(targetUserId, role) {
          check(targetUserId, String);
          check(role, String);
          let loggedInUser = Meteor.user();

          if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin', 'god'])) {
            throw new Meteor.Error(403, 'Access denied');
          }
          Roles.setUserRoles(targetUserId, role);
        }*/
  });
}


Meteor.methods({
  /*  'Users.methods.setUserImage': function(userId, imageId) {
      check(userId, String);
      check(imageId, String);
      Meteor.users.update({
        _id: userId
      }, {
        $set: {
          'profile.imageId': imageId
        }
      });
    },*/
  /*  'Users.methods.edit': function(modifier, documentId) {
      check(modifier, Meteor.users.Schema);
      check(documentId, String);

      if (isAdmin() || isProfileOwner(documentId)) {
        return Meteor.users.update({
          _id: documentId
        }, modifier);
      }
      throw new Meteor.Error(403, 'Não tem permissão.');
    },*/
  /*  'Users.methods.remove': function(userId) {
      check(userId, String);
      return Meteor.users.remove({ _id: userId });
    }*/
});


// ********************************
// ***** Projects Permissions *****
// ********************************
Meteor.methods({
  /*  'Users.methods.addProject': function(targetUserId, projectId) {
      check(targetUserId, String);
      check(projectId, String);

      if (isAdmin() || isEditor()) {
        Meteor.users.update({
          _id: targetUserId
        }, {
          $addToSet: {
            projectsId: projectId
          }
        });
      } else {
        throw new Meteor.Error('not-authorized');
      }
    },*/
/*  'Users.methods.removeProject': function(targetUserId, projectId) {
    check(targetUserId, String);
    check(projectId, String);

    if (isAdmin()) {
      Meteor.users.update({
        _id: targetUserId
      }, {
        $pull: {
          projectsId: projectId
        }
      });
    } else {
      throw new Meteor.Error(403, 'Não tem permissão');
    }
  }*/
});

Meteor.methods({
/*  'Users.methods.updateProfile': function(modifier, documentId) {
    check(modifier, Schemas.Users);
    check(documentId, String);
    return Meteor.users.update({
      _id: documentId
    }, modifier);
  }*/
});
