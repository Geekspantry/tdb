import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { Collections } from './collections.js';
import { CollectionSchema } from './schema.js';
import { _ } from 'meteor/underscore';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

/**
 * Insert Collection
 *
 * Permissions: [admin, editor]
 */
export const insert = new ValidatedMethod({
  name: 'collections.insert',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collections.insert.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collections.insert.notAuthorized',
    }
  },
  validate: CollectionSchema.validator(),
  run(doc) {
    return Collections.insert(doc);
  }
});

/**
 * Remove Collection
 *
 * Permissions: [admin, editor]
 */
export const remove = new ValidatedMethod({
  name: 'collections.remove',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collections.remove.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collections.remove.notAuthorized',
    }
  },
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    // Delete the collection and all it's children
    return Collections.remove({
      $or: [{
        _id: _id
      }, {
        parentId: _id
      }]
    });
  }
});

/**
 * Update Collection
 *
 * Permissions: [admin, editor]
 */
export const update = new ValidatedMethod({
  name: 'collections.update',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collections.update.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collections.update.notAuthorized',
    }
  },
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    return Collections.update(_id, modifier);
  }
});

/**
 * Copy Collection
 *
 * Permissions: [admin, editor]
 */
export const copy = new ValidatedMethod({
  name: 'collections.copy',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collections.copy.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collections.copy.notAuthorized',
    }
  },
  validate({_id}) {
    check(_id, String);
  },
  run({ _id }) {
    let collection = Collections.findOne({
      _id: _id
    });

    delete collection._id;
    delete collection.updatedAt;
    delete collection.createdAt;
    delete collection.updatedBy;

    collection.name = `${collection.name} copy`;
    return Collections.insert(collection);
  }
});


/**
 * Add Technology to Collection
 *
 * Permissions: [admin, editor]
 */
export const addTechnology = new ValidatedMethod({
  name: 'collections.addTechnology',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collections.addTechnology.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collections.addTechnology.notAuthorized',
    }
  },
  validate({ collectionId, techId, position }) {
    check(collectionId, String);
    check(techId, String);
    check(position, Match.Maybe(Number));
  },
  run({ collectionId, techId, position }) {
    let pushedObj = { $each: [techId] };
    if (position !== null && position >= 0) pushedObj.$position = position;


    let targetCollection = Collections.findOne({
      _id: collectionId
    });

    if (!targetCollection) throw new Meteor.Error('target-not-found');
    if (_.contains(targetCollection.technologiesId, techId)) throw new Meteor.Error('target-already-has-tech');

    return Collections.update({
      _id: collectionId
    }, {
      $push: {
        technologiesId: pushedObj
      }
    });
  }
});


/**
 * Remove Technology from Collection
 *
 * Permissions: [admin, editor]
 */
export const removeTechnology = new ValidatedMethod({
  name: 'collections.removeTechnology',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collections.removeTechnology.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collections.removeTechnology.notAuthorized',
    }
  },
  validate({ source, techId }) {
    check(source, String);
    check(techId, String);
  },
  run({ source, techId }) {
    return Collections.update({
      _id: source
    }, {
      $pull: {
        technologiesId: techId
      }
    });
  }
});


/**
 * Move technology from one Collection to another
 *
 * Permissions: [admin, editor]
 */
export const moveTechnology = new ValidatedMethod({
  name: 'collections.moveTechnology',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'collections.moveTechnology.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'collections.moveTechnology.notAuthorized',
    }
  },
  validate({ source, target, techId, position }) {
    check(source, String);
    check(target, String);
    check(techId, String);
    check(position, Match.Maybe(Number));
  },
  run({ source, target, techId, position }) {
    let sourceCollection = Collections.findOne({
      _id: source
    });

    if (!sourceCollection) {
      throw new Meteor.Error('collections.moveTechnology.source-not-found');
    }
    if (!_.contains(sourceCollection.technologiesId, techId)) {
      throw new Meteor.Error('collections.moveTechnology.not-in-source');
    }

    let targetCollection = Collections.findOne({
      _id: target
    });

    if (!targetCollection) {
      throw new Meteor.Error('collections.moveTechnology.target-not-found');
    }
    if (source !== target && _.contains(targetCollection.technologiesId, techId)) {
      throw new Meteor.Error('collections.moveTechnology.target-already-has-tech');
    }

    let sourceUpdate = Collections.update({
      _id: source
    }, {
      $pull: {
        technologiesId: techId
      }
    });

    if (!sourceUpdate) {
      throw new Meteor.Error('collections.moveTechnology.source-update-error');
    }

    let pushedObj = { $each: [techId] };
    if (position !== null && position >= 0) pushedObj.$position = position;

    let targetUpdate = Collections.update({
      _id: target
    }, {
      $push: {
        technologiesId: pushedObj
      }
    });

    if (!targetUpdate) {
      throw new Meteor.Error('collections.moveTechnology.source-update-error');
    }

    return true;
  }
});
