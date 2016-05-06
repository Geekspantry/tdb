import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Technologies } from '../technologies/technologies';
import { TechnologiesDescriptions } from './technologies_descriptions.js';
import { TechnologyDescriptionSchema, DESCRIPTION_STATUS } from './schema.js';

/**
 * Insert a new technology description
 */
export const insert = new ValidatedMethod({
  name: 'technologies_descriptions.insert',
  validate: TechnologyDescriptionSchema.validator(),
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
  validate: new SimpleSchema({
    technologyId: { type: String },
    descriptionId: { type: String }
  }).validator(),
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
  validate: new SimpleSchema({
    _id: { type: String },
    modifier: { type: Object, blackbox: true }
  }).validator(),
  run({ _id, modifier }) {
    return TechnologiesDescriptions.update(_id, modifier);
  },
});

export const remove = new ValidatedMethod({
  name: 'technologies_descriptions.remove',
  validate: new SimpleSchema({
    descriptionId: { type: String }
  }).validator(),
  run({ descriptionId }) {
    return TechnologiesDescriptions.remove(descriptionId)
  },
});
