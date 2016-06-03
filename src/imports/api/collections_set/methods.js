/**
 * CollectionsSet Methods
 */

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Projects } from '../projects/projects';
import { CollectionsSetSchema } from './schema.js';
import { CollectionsSet } from './collections_set.js';
import { Collections } from '/imports/api/collections/collections';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}

/**
 * Insert Collections Set
 *
 * Permissions: [admin, editor]
 */
export const insert = new ValidatedMethod({
  name: 'collectionsSet.insert',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collectionsSet.insert.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collectionsSet.insert.notAuthorized',
    }
  },
  validate: CollectionsSetSchema.validator(),
  run(doc) {
    return CollectionsSet.insert(doc);
  }
});

/**
 * Remove Collections Set
 *
 * Permissions: [admin, editor]
 */
export const remove = new ValidatedMethod({
  name: 'collectionsSet.remove',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collectionsSet.remove.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collectionsSet.remove.notAuthorized',
    }
  },
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    check(_id, String);
    // Delete all the Collections inside of it.
    Collections.remove({
      collectionsSetId: _id
    });

    return CollectionsSet.remove({
      _id: _id
    });
  }
});
