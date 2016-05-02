import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Technologies } from './technologies.js';
import { TechnologySchema } from './schema.js';

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}

export const insert = new ValidatedMethod({
  name: 'technologies.insert',
  validate: TechnologySchema.validator(),
  run(doc) {
    checkPermissions();
    return Technologies.insert(doc);
  }
});

export const update = new ValidatedMethod({
  name: 'technologies.update',
  validate: new SimpleSchema({
    _id: { type: String },
    modifier: { type: Object, blackbox: true }
  }).validator(),
  run({ _id, modifier }) {
    checkPermissions();
    return Technologies.update(_id, modifier);
  }
});

export const remove = new ValidatedMethod({
  name: 'technologies.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    checkPermissions();
    Technologies.remove({
      _id: techId
    });
  }
});


export const linkImage = new ValidatedMethod({
  name: 'technologies.linkImage',
  validate: new SimpleSchema({
    _id: { type: String },
    imageId: { type: String }
  }).validator(),
  run({ _id, imageId }) {
    checkPermissions();
    const technology = Technologies.findOne(_id);
    const image = technology.images.find(i => i.src === imageId);

    if (image) {
      throw new Meteor.Error('technologies.linkImage', 'Image already linked with the given technology.');
    }

    return Technologies.update(_id, {
      $push: {
        images: {
          src: imageId,
          showcased: false
        }
      }
    });
  }
});

export const unlinkImage = new ValidatedMethod({
  name: 'technologies.unlinkImage',
  validate: new SimpleSchema({
    _id: { type: String },
    imageId: { type: String }
  }).validator(),
  run({ _id, imageId }) {
    checkPermissions();
    const technology = Technologies.findOne(_id);
    const image = technology.images.find(i => i.src === imageId);
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
 */
export const updateShowcasedImage = new ValidatedMethod({
  name: 'technologies.updateShowcasedImage',
  validate: new SimpleSchema({
    _id: { type: String },
    imageId: { type: String }
  }).validator(),
  run({ _id, imageId }) {
    checkPermissions();
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
