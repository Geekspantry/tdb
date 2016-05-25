import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { Organizations } from './organizations.js';
import { OrganizationSchema, KeyPeopleSchema } from './schema.js';
import { Projects } from '/imports/api/projects/projects';
import { Technologies } from '/imports/api/technologies/technologies';
import { Attachments } from '/imports/api/attachments/attachments';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

function isAuthorized() {
  return Roles.userIsInRole(Meteor.user(), ['admin', 'editor']);
}

/**
 * Insert Organization
 *
 * Permissions: [admin, editor]
 */
export const insert = new ValidatedMethod({
  name: 'organizations.insert',
  validate: OrganizationSchema.validator(),
  run(doc) {
    if (isAuthorized()) {
      return Organizations.insert(doc);
    }
    throw new Meteor.Error('organizations.insert.not-authorized');
  }
});

/**
 * Update Organization
 *
 * Permissions: [admin, editor]
 */
export const update = new ValidatedMethod({
  name: 'organizations.update',
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (isAuthorized()) {
      return Organizations.update(_id, modifier);
    }
    throw new Meteor.Error('organizations.update.not-authorized');
  }
});

/**
 * Remove Organization
 *
 * Permissions: [admin, editor]
 */
export const remove = new ValidatedMethod({
  name: 'organizations.remove',
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    if (isAuthorized()) {
      return Organizations.remove({ _id: _id });
    }
    throw new Meteor.Error('organizations.remove.not-authorized');
  }
});

/**
 * Add Organization to Project
 *
 * Permissions: [admin, editor]
 */
export const addProject = new ValidatedMethod({
  name: 'organizations.addProject',
  validate({ orgId, projectId }) {
    check(orgId, String);
    check(projectId, String);
  },
  run({ orgId, projectId }) {
    if (isAuthorized()) {
      return Projects.update({
        _id: projectId
      }, {
        $addToSet: {
          organizationsId: orgId
        }
      });
    }
    throw new Meteor.Error('organizations.addProject.not-authorized');
  }
});

// move to projects method

/**
 * Remove Organization from Project
 *
 * Permissions: [admin, editor]
 */
export const removeProject = new ValidatedMethod({
  name: 'organizations.removeProject',
  validate({ orgId, projectId }) {
    check(orgId, String);
    check(projectId, String);
  },
  run({ orgId, projectId }) {
    if (isAuthorized()) {
      return Projects.update({
        _id: projectId
      }, {
        $pull: {
          organizationsId: orgId
        }
      });
    }
    throw new Meteor.Error('organizations.removeProject.not-authorized');
  }
});

/**
 * Add Organization to Technology
 *
 * Permissions: [admin, editor]
 */
export const addTechnology = new ValidatedMethod({
  name: 'organizations.addTechnology',
  validate({ orgId, technologyId }) {
    check(orgId, String);
    check(technologyId, String);
  },
  run({ orgId, technologyId }) {
    if (isAuthorized()) {
      return Technologies.update({
        _id: technologyId
      }, {
        $addToSet: {
          organizationsId: orgId
        }
      });
    }
    throw new Meteor.Error('organizations.addTechnology.not-authorized');
  }
});

// move to technologies method
/**
 * Remove Organization from Technology
 *
 * Permissions: [admin, editor]
 */
export const removeTechnology = new ValidatedMethod({
  name: 'organizations.removeTechnology',
  validate({ orgId, technologyId }) {
    check(orgId, String);
    check(technologyId, String);
  },
  run({ orgId, technologyId }) {
    if (isAuthorized()) {
      return Technologies.update({
        _id: technologyId
      }, {
        $pull: {
          organizationsId: orgId
        }
      });
    }
    throw new Meteor.Error('organizations.removeTechnology.not-authorized');
  }
});

/**
 * Add Attachment to Organization
 *
 * Permissions: [admin, editor]
 */
export const addAttachment = new ValidatedMethod({
  name: 'organizations.addAttachment',
  validate({ orgId, attachmentId }) {
    check(attachmentId, String);
    check(orgId, String);
  },
  run({ orgId, attachmentId }) {
    if (isAuthorized()) {
      return Organizations.update({
        _id: orgId
      }, {
        $addToSet: {
          attachmentsId: attachmentId
        }
      });
    }
    throw new Meteor.Error('organizations.addAttachment.not-authorized');
  }
});

/**
 * Remove Attachment from Organization
 *
 * Permissions: [admin, editor]
 */
export const removeAttachment = new ValidatedMethod({
  name: 'organizations.removeAttachment',
  validate({ orgId, attachmentId }) {
    check(attachmentId, String);
    check(orgId, String);
  },
  run({ orgId, attachmentId }) {
    if (isAuthorized()) {
      return Organizations.update({
        _id: orgId
      }, {
        $pull: {
          attachmentsId: attachmentId
        }
      });
    }
    throw new Meteor.Error('organizations.removeAttachment.not-authorized');
  }
});

/**
 * Add KeyPeople to Organization
 *
 * Permissions: [admin, editor]
 */
export const addKeyPeople = new ValidatedMethod({
  name: 'organizations.addKeyPeople',
  validate({ orgId, personDoc }) {
    check(personDoc, KeyPeopleSchema);
    check(orgId, String);
  },
  run({ orgId, personDoc }) {
    if (!this.isSimulartion) {
      if (isAuthorized()) {
        chance = new Chance();
        personDoc._id = chance.string();
        return Organizations.update({
          _id: orgId
        }, {
          $push: {
            keyPeople: personDoc
          }
        });
      }
      throw new Meteor.Error('organizations.addKeyPeople.not-authorized');
    }

    return true;
  }
});

/**
 * Remove KeyPeople from Organization
 *
 * Permissions: [admin, editor]
 */
export const removeKeyPeople = new ValidatedMethod({
  name: 'organziations.removeKeyPeople',
  validate({ orgId, personId }) {
    check(orgId, String);
    check(personId, String);
  },
  run({ orgId, personId }) {
    if (isAuthorized()) {
      return Organizations.update({
        _id: orgId
      }, {
        $pull: {
          keyPeople: {
            _id: personId
          }
        }
      });
    }
    throw new Meteor.Error('organizations.removeKeyPeople.not-authorized');
  }
});


/**
 * Set Logo for Organization
 *
 * Permissions: [admin, editor]
 */
export const setLogo = new ValidatedMethod({
  name: 'organizations.setLogo',
  validate({ orgId, imageId }) {
    check(orgId, String);
    check(imageId, String);
  },
  run({ orgId, imageId }) {
    if (isAuthorized()) {
      return Organizations.update({
        _id: orgId
      }, {
        $set: {
          logo: imageId
        }
      });
    }
    throw new Meteor.Error('organizations.setLogo.not-authorized');
  }
});
