import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { Technologies } from './technologies.js';
import { TechnologySchema } from './schema.js';
import { TechnologiesDescriptions } from '../technologies_descriptions/technologies_descriptions.js';
import { _ } from 'meteor/underscore';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}

function isAdminOrEditor() {
  return Roles.userIsInRole(Meteor.user(), ['admin', 'editor']);
}

function isLoggedIn() {
  return !!Meteor.userId();
}
/**
 * Insert Technology
 *
 * Permissions: [logged in]
 */
export const insert = new ValidatedMethod({
  name: 'technologies.insert',
  validate: TechnologySchema.validator(),
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'technologies.insert.not-logged-in',
  },
  run(doc) {
    return Technologies.insert(doc);
  }
});

/**
 * Update Technology
 *
 * Permissions: [logged in]
 * Special Permission: Only [admin, editor] can update "status"
 * Shouldn't we move this to another method?
 */
export const update = new ValidatedMethod({
  name: 'technologies.update',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'technologies.update.not-logged-in',
  },
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    // Anyone can create Technologies, but just Editors and Admins can change its status.
    if (modifier.$set && modifier.$set.status) {
      const technology = Technologies.findOne(_id);
      if (technology.status !== modifier.$set.status) {
        if (!isAdminOrEditor()) {
          throw new ValidationError([{
              name: 'status',
              type: 'Technologies_updateStatusNeedAdminOrEditor',
            }],
            'Only Admins and Editors can update Technology Status. Keep the previous status to save your changes'
          );
        }
      }
    }
    return Technologies.update(_id, modifier);
  }
});

/**
 * Remove Technology
 *
 * Permissions: [admin, editor]
 */
export const remove = new ValidatedMethod({
  name: 'technologies.remove',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'technologies.remove.not-logged-in',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'technologies.remove.not-authorized',
    }
  },
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    if (isAuthorized()) {
      Technologies.remove({ _id: _id });
      TechnologiesDescriptions.remove({ technologyId: _id }); // move to hooks?
      return true;
    }
    throw new Meteor.Error('technologies.remove.not-authorized');
  }
});

/**
 * Link Image to  Technology
 *
 * Permissions: [logged in]
 */
export const linkImage = new ValidatedMethod({
  name: 'technologies.linkImage',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'technologies.linkImage.not-logged-in',
  },
  validate: new SimpleSchema({
    _id: { type: String },
    imageId: { type: String }
  }).validator(),
  run({ _id, imageId }) {
    const technology = Technologies.findOne(_id);
    if (!technology) {
      throw new Meteor.Error('technologies.linkImage.technology-not-found',
        `Could not find a technology with _id ${_id}.`);
    }
    if (technology.images && technology.images.find(i => i.src === imageId)) {
      throw new Meteor.Error('technologies.linkImage.image-already-linked',
        'Image already linked with the given technology.');
    }
    // If is the first image, set as showcased.
    const showcased = !technology.images;

    return Technologies.update(_id, {
      $push: {
        images: {
          src: imageId,
          showcased: showcased
        }
      }
    });
  }
});

/**
 * Insert Technology
 *
 * Permissions: [logged in]
 */
export const unlinkImage = new ValidatedMethod({
  name: 'technologies.unlinkImage',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'technologies.unlinkImage.not-logged-in',
  },
  validate: new SimpleSchema({
    _id: { type: String },
    imageId: { type: String }
  }).validator(),
  run({ _id, imageId }) {
    const technology = Technologies.findOne(_id);
    const image = technology.images.find(i => i.src === imageId);

    if (image.showcased) {
      throw new Meteor.Error('technologies.unlinkImage.cant-unlink-showcased',
        'Can\'t remove showcased image.');
    }

    return Technologies.update(_id, {
      $pull: {
        images: image
      }
    });
  }
});

/**
 * Update the current showcased image of a given technology.
 * - It will update the current showcased image to false
 * - And then update the new image with the given imageId to true
 * @param {String} _id The technology _id
 * @param {String} imageId The image _id
 *
 * Permissions: [logged in]
 */
export const updateShowcasedImage = new ValidatedMethod({
  name: 'technologies.updateShowcasedImage',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'technologies.updateShowcasedImage.not-logged-in',
  },
  validate: new SimpleSchema({
    _id: { type: String },
    imageId: { type: String }
  }).validator(),
  run({ _id, imageId }) {
    const technology = Technologies.findOne(_id);
    const currentShowcasedImage = technology.images.find(i => i.showcased);

    if (currentShowcasedImage) {
      Technologies.update({
        _id: _id,
        'images.src': currentShowcasedImage.src
      }, {
        $set: {
          'images.$.showcased': false
        }
      });
    }

    return Technologies.update({
      _id: _id,
      'images.src': imageId
    }, {
      $set: {
        'images.$.showcased': true
      }
    });
  }
});





// export const shouldUpdateStatus = new ValidatedMethod({
//   name: 'technologies.shouldUpdateStatus',
//   validate: new SimpleSchema({
//     _id: {
//       type: String
//     },
//     status: {
//       type: String
//     }
//   }).validator(),
//   run() {
//     console.log('Error')
//     throw new Meteor.Error(412, 'Invalid');
//   }
// });
