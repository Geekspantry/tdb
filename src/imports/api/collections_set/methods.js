/**
 * CollectionsSet Methods
 */

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Projects } from '../projects/projects';
import { CollectionsSetSchema } from './schema.js';
import { CollectionsSet } from './collections_set.js';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}


export const insert = new ValidatedMethod({
  name: 'collectionsSet.insert',
  validate: CollectionsSetSchema.validator(),
  run(doc) {
    return CollectionsSet.insert(doc);
  }
});

export const remove = new ValidatedMethod({
  name: 'collectionsSet.remove',
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    check(_id, String);
    checkPermissions();
    CollectionsSet.remove({
      _id: _id
    });
    // Delete all the Collections inside of it.
    Collections.remove({
      collectionsSetId: _id
    });
  }
});
