import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { Organizations } from './organizations.js';
import { OrganizationSchema, KeyPeopleSchema } from './schema.js';
import { Projects } from '/imports/api/projects/projects';
import { Technologies } from '/imports/api/technologies/technologies';
import { Attachments } from '/imports/api/attachments/attachments';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

/**
 * Insert Organization
 *
 * Permissions: [admin, editor]
 */
export const insert = new ValidatedMethod({
  name: 'organizations.insert',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.insert.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.insert.not-authorized',
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
    error: 'organizations.update.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.update.not-authorized',
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
    error: 'organizations.remove.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.remove.not-authorized',
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
    error: 'organizations.addProject.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.addProject.not-authorized',
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
    error: 'organizations.removeProject.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.removeProject.not-authorized',
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

/**
 * Add Organization to Technology
 *
 * Permissions: [admin, editor]
 */
export const addTechnology = new ValidatedMethod({
  name: 'organizations.addTechnology',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.addTechnology.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.addTechnology.not-authorized',
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

// move to technologies method
/**
 * Remove Organization from Technology
 *
 * Permissions: [admin, editor]
 */
export const removeTechnology = new ValidatedMethod({
  name: 'organizations.removeTechnology',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.removeTechnology.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.removeTechnology.not-authorized',
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
 *
 * Permissions: [admin, editor]
 */
export const addAttachment = new ValidatedMethod({
  name: 'organizations.addAttachment',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.addAttachment.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.addAttachment.not-authorized',
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
 *
 * Permissions: [admin, editor]
 */
export const removeAttachment = new ValidatedMethod({
  name: 'organizations.removeAttachment',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.removeAttachment.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.removeAttachment.not-authorized',
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
 *
 * Permissions: [admin, editor]
 */
export const addKeyPeople = new ValidatedMethod({
  name: 'organizations.addKeyPeople',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.addKeyPeople.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.addKeyPeople.not-authorized',
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
 *
 * Permissions: [admin, editor]
 */
export const removeKeyPeople = new ValidatedMethod({
  name: 'organziations.removeKeyPeople',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.removeKeyPeople.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.removeKeyPeople.not-authorized',
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
 *
 * Permissions: [admin, editor]
 */
export const setLogo = new ValidatedMethod({
  name: 'organizations.setLogo',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'organizations.setLogo.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'organizations.setLogo.not-authorized',
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
