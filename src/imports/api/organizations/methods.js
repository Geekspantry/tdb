import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';

import { Projects } from '/imports/api/projects/projects';
import { Technologies } from '/imports/api/technologies/technologies';
import { Attachments } from '/imports/api/attachments/attachments';
import { Organizations } from './organizations.js';

import {
  OrganizationSchema,
  KeyPeopleSchema
} from './schema.js';

import {
  ValidatedMethodUpdateSchema,
  ValidatedMethodRemoveSchema
} from '../shared/schemas';

/**
 * Insert Organization
 *
 * Permissions: [admin, editor]
 */
export const insert = new ValidatedMethod({
  name: 'organizations.insert',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.insert.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor', 'researcher'],
    rolesError: {
      error: 'organizations.insert.notAuthorized',
    }
  },
  validate: OrganizationSchema.validator(),
  run(doc) {
    return Organizations.insert(doc);
  }
});

/**
 * Update Organization
 *
 * Permissions: [admin, editor]
 */
export const update = new ValidatedMethod({
  name: 'organizations.update',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.update.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor', 'researcher'],
    rolesError: {
      error: 'organizations.update.notAuthorized',
    }
  },
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    return Organizations.update(_id, modifier);
  }
});

/**
 * Remove Organization
 *
 * Permissions: [admin, editor]
 */
export const remove = new ValidatedMethod({
  name: 'organizations.remove',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.remove.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.remove.notAuthorized',
    }
  },
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    return Organizations.remove({ _id: _id });
  }
});

/**
 * Add Organization to Project
 *
 * Permissions: [admin, editor]
 */
export const addProject = new ValidatedMethod({
  name: 'organizations.addProject',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.addProject.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.addProject.notAuthorized',
    }
  },
  validate({ orgId, projectId }) {
    check(orgId, String);
    check(projectId, String);
  },
  run({ orgId, projectId }) {
    return Projects.update({
      _id: projectId
    }, {
      $addToSet: {
        organizationsId: orgId
      }
    });
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
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.removeProject.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.removeProject.notAuthorized',
    }
  },
  validate({ orgId, projectId }) {
    check(orgId, String);
    check(projectId, String);
  },
  run({ orgId, projectId }) {
    return Projects.update({
      _id: projectId
    }, {
      $pull: {
        organizationsId: orgId
      }
    });
  }
});

// =============================================
// TODO: Move this relation methods to technology
// =============================================
/**
 * Add Organization to Technology
 */
export const addTechnology = new ValidatedMethod({
  name: 'organizations.addTechnology',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.addTechnology.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor', 'researcher'],
    rolesError: {
      error: 'organizations.addTechnology.notAuthorized',
    }
  },
  validate({ orgId, technologyId }) {
    check(orgId, String);
    check(technologyId, String);
  },
  run({ orgId, technologyId }) {
    return Technologies.update({
      _id: technologyId
    }, {
      $addToSet: {
        organizationsId: orgId
      }
    });
  }
});

/**
 * Remove Organization from Technology
 */
export const removeTechnology = new ValidatedMethod({
  name: 'organizations.removeTechnology',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.removeTechnology.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.removeTechnology.notAuthorized',
    }
  },
  validate({ orgId, technologyId }) {
    check(orgId, String);
    check(technologyId, String);
  },
  run({ orgId, technologyId }) {
    return Technologies.update({
      _id: technologyId
    }, {
      $pull: {
        organizationsId: orgId
      }
    });
  }
});

/**
 * Add Attachment to Organization
 */
export const addAttachment = new ValidatedMethod({
  name: 'organizations.addAttachment',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.addAttachment.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor', 'researcher'],
    rolesError: {
      error: 'organizations.addAttachment.notAuthorized',
    }
  },
  validate({ orgId, attachmentId }) {
    check(attachmentId, String);
    check(orgId, String);
  },
  run({ orgId, attachmentId }) {
    return Organizations.update({
      _id: orgId
    }, {
      $addToSet: {
        attachmentsId: attachmentId
      }
    });
  }
});

/**
 * Remove Attachment from Organization
 */
export const removeAttachment = new ValidatedMethod({
  name: 'organizations.removeAttachment',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.removeAttachment.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.removeAttachment.notAuthorized',
    }
  },
  validate({ orgId, attachmentId }) {
    check(attachmentId, String);
    check(orgId, String);
  },
  run({ orgId, attachmentId }) {
    return Organizations.update({
      _id: orgId
    }, {
      $pull: {
        attachmentsId: attachmentId
      }
    });
  }
});

/**
 * Add KeyPeople to Organization
 */
export const addKeyPeople = new ValidatedMethod({
  name: 'organizations.addKeyPeople',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.addKeyPeople.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor', 'researcher'],
    rolesError: {
      error: 'organizations.addKeyPeople.notAuthorized',
    }
  },
  validate({ orgId, personDoc }) {
    check(personDoc, KeyPeopleSchema);
    check(orgId, String);
  },
  run({ orgId, personDoc }) {
    if (!this.isSimulation) {
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

    return true;
  }
});

/**
 * Remove KeyPeople from Organization
 */
export const removeKeyPeople = new ValidatedMethod({
  name: 'organizations.removeKeyPeople',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.removeKeyPeople.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.removeKeyPeople.notAuthorized',
    }
  },
  validate({ orgId, personId }) {
    check(orgId, String);
    check(personId, String);
  },
  run({ orgId, personId }) {
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
});


/**
 * Set Logo for Organization
 */
export const setLogo = new ValidatedMethod({
  name: 'organizations.setLogo',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.setLogo.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.setLogo.notAuthorized',
    }
  },
  validate({ orgId, imageId }) {
    check(orgId, String);
    check(imageId, String);
  },
  run({ orgId, imageId }) {
    return Organizations.update({
      _id: orgId
    }, {
      $set: {
        logo: imageId
      }
    });
  }
});
