import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Technologies } from '../technologies/technologies';
import { TechnologiesDescriptions } from './technologies_descriptions.js';
import { TechnologyDescriptionSchema, DESCRIPTION_STATUS } from './schema.js';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
/**
 * Insert a new technology description
 */
export const insert = new ValidatedMethod({
  name: 'technologies_descriptions.insert',
  mixins: [LoggedInMixin],
  validate: TechnologyDescriptionSchema.validator(),
  checkLoggedInError: {
    error: 'notLogged',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'notAllowed',
      message: 'Just Admins and Editors can add a description.'
    }
  },
  run(doc) {
    return TechnologiesDescriptions.insert(doc);
  },
});

/**
 * Publish a description for a technology.
 * It will make two update operations:
 *  - Change the current description published to draft (if exists)
 *  - Publish the description with the given {descriptionId}
 */
export const publish = new ValidatedMethod({
  name: 'technologies_descriptions.publish',
  mixins: [LoggedInMixin],
  validate: new SimpleSchema({
    technologyId: { type: String },
    descriptionId: { type: String }
  }).validator(),
  checkLoggedInError: {
    error: 'notLogged',

  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'notAllowed',
      message: 'Just Admins and Editors publish a description.'
    }
  },
  run({ technologyId, descriptionId }) {
    const publishedDescription = TechnologiesDescriptions.findOne({
      technologyId: technologyId,
      status: DESCRIPTION_STATUS.PUBLISHED
    });

    if (publishedDescription) {
      TechnologiesDescriptions.update(publishedDescription._id, {
        $set: {
          status: DESCRIPTION_STATUS.DRAFT
        }
      });
    }

    TechnologiesDescriptions.update(descriptionId, {
      $set: {
        status: DESCRIPTION_STATUS.PUBLISHED
      }
    });
  }
});

export const update = new ValidatedMethod({
  name: 'technologies_descriptions.update',
  mixins: [LoggedInMixin],
  validate: new SimpleSchema({
    _id: { type: String },
    modifier: { type: Object, blackbox: true }
  }).validator(),
  checkLoggedInError: {
    error: 'notLogged',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'notAllowed',
      message: 'Just Admins and Editors update a description.'
    }
  },
  run({ _id, modifier }) {
    return TechnologiesDescriptions.update(_id, modifier);
  },
});

export const remove = new ValidatedMethod({
  name: 'technologies_descriptions.remove',
  mixins: [LoggedInMixin],
  validate: new SimpleSchema({
    descriptionId: { type: String }
  }).validator(),
  checkLoggedInError: {
    error: 'notLogged',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'notAllowed',
      message: 'Just Admins and Editors remove a description.'
    }
  },
  run({ descriptionId }) {
    const description = TechnologiesDescriptions.findOne(descriptionId);

    if (description.status === DESCRIPTION_STATUS.PUBLISHED) {
      throw new Meteor.Error("Can't remove a published description");
    }

    return TechnologiesDescriptions.remove(descriptionId);
  },
});
