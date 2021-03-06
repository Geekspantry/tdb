/**
 * Projects Methods
 */

import { Projects } from './projects';
import { Technologies } from '../technologies/technologies.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { ProjectSchema } from './schema.js';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

/**
 * CRUD Operations
 * - Insert, Update, Remove
 * @param {String} doc The Project doc to be Inserted
 * @param {String} _id The Project _id to be Updated or Removed
 * @param {String} modifier The modifier for Update operations
 * @throws {Meteor.error('notAuthorized')} If [User is either not logged in OR not administrator OR not editor]
 */
export const insert = new ValidatedMethod({
  name: 'projects.insert',
  mixins: [LoggedInMixin],
  validate: ProjectSchema.validator(),
  checkLoggedInError: {
    error: 'projects.insert.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'projects.insert.notAuthorized',
    }
  },
  run(doc) {
    return Projects.insert(doc);
  }
});

export const update = new ValidatedMethod({
  name: 'projects.update',
  mixins: [LoggedInMixin],
  validate: ValidatedMethodUpdateSchema.validator(),
  checkLoggedInError: {
    error: 'projects.update.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'projects.update.notAuthorized',
    }
  },
  run({ _id, modifier }) {
    return Projects.update(_id, modifier);
  }
});

export const remove = new ValidatedMethod({
  name: 'projects.remove',
  mixins: [LoggedInMixin],
  validate: ValidatedMethodRemoveSchema.validator(),
  checkLoggedInError: {
    error: 'projects.remove.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'projects.remove.notAuthorized',
    }
  },
  run({ _id }) {
    Projects.remove({
      _id: _id
    });
  }
});

/**
 * Push a new technology to the technologiesStash
 * - It will create and object with the techId, techName (for searching purposes), userId and the Date
 * - Will increment the technologiesStashCount
 * @param {String} projectId The Project _id
 * @param {String} techId The Technology _id
 * @throws {Meteor.error('tech-already-on-stash')} If [Technology is already on stash]
 * @throws {Meteor.error('tech-not-found')} If [Technology is not found on the server]
 * @throws {Meteor.error('notAuthorized')} If [User is either not logged in OR not administrator OR not editor]
 */

export const pushTechnologiesStash = new ValidatedMethod({
  name: 'projects.pushTechnologiesStash',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'projects.pushTechnologiesStash.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'projects.pushTechnologiesStash.notAuthorized',
    }
  },
  validate({ projectId, techId }) {
    check(projectId, String);
    check(techId, String);
  },
  run({ projectId, techId }) {
    let project = Projects.findOne({
      _id: projectId,
      'technologiesStash.technologyId': techId
    });
    if (project) throw new Meteor.Error('tech-already-on-stash', 'Technology already on stash.');

    let tech = Technologies.findOne({
      _id: techId
    }, {
      fields: {
        name: 1
      }
    });
    if (Meteor.isServer && !tech) {
      throw new Meteor.Error(500, 'Technology not found.');
    }
    let techName = tech && tech.name;
    let stashedTech = {
      technologyId: techId,
      techName: techName,
      addedAt: new Date()
    };


    return Projects.update({
      _id: projectId
    }, {
      $addToSet: {
        technologiesStash: stashedTech
      },
      $inc: {
        technologiesStashCount: 1
      }
    });
  }
});

/**
 * Pull a technology from technologiesStash
 * - It will remove the technology if it's found on the array
 * - It will decrement the technologiesStashCount
 * @param {String} projectId The Project _id
 * @param {String} techId The Technology _id
 * @throws {Meteor.error('notAuthorized')} If [User is either not logged in OR not administrator OR not editor]
 */

export const pullTechnologiesStash = new ValidatedMethod({
  name: 'projects.pullTechnologiesStash',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'projects.pushTechnologiesStash.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'projects.pushTechnologiesStash.notAuthorized',
    }
  },
  validate({ projectId, techId }) {
    check(projectId, String);
    check(techId, String);
  },
  run({ projectId, techId }) {
    return Projects.update({
      _id: projectId
    }, {
      $pull: {
        technologiesStash: {
          technologyId: techId
        }
      },
      $inc: {
        technologiesStashCount: -1
      }
    });
  }
});
