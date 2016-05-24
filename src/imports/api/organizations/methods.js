import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';
import { Organizations } from './organizations.js';
import { OrganizationSchema } from './schema.js';
import { Projects } from '/imports/api/projects/projects';
import { Technologies } from '/imports/api/technologies/technologies';
import { Attachments } from '/imports/api/attachments/attachments';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';


function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}

export const insert = new ValidatedMethod({
  name: 'organizations.insert',
  validate: OrganizationSchema.validator(),
  run(doc) {
    checkPermissions();
    return Organizations.insert(doc);
  }
});

export const update = new ValidatedMethod({
  name: 'organizations.update',
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    checkPermissions();
    return Organizations.update(_id, modifier);
  }
});


export const remove = new ValidatedMethod({
  name: 'organizations.remove',
  validate: ValidatedMethodRemoveSchema.validator(),
  run({ _id }) {
    checkPermissions();
    return Organizations.remove({ _id: _id });
  }
});

// move to projects method
export const addProject = new ValidatedMethod({
  name: 'organizations.addProject',
  validate({ orgId, projectId }) {
    check(orgId, String);
    check(projectId, String);
  },
  run({ orgId, projectId }) {
    checkPermissions();
    Projects.update({
      _id: projectId
    }, {
      $addToSet: {
        organizationsId: orgId
      }
    });
  }
});

// move to projects method
export const removeProject = new ValidatedMethod({
  name: 'organizations.removeProject',
  validate({ orgId, projectId }) {
    check(orgId, String);
    check(projectId, String);
  },
  run({ orgId, projectId }) {
    checkPermissions();
    return Projects.update({
      _id: projectId
    }, {
      $pull: {
        organizationsId: orgId
      }
    });
  }
});

// move to technologies method
export const addTechnology = new ValidatedMethod({
  name: 'organizations.addTechnology',
  validate({ orgId, technologyId }) {
    check(orgId, String);
    check(technologyId, String);
  },
  run({ orgId, technologyId }) {
    checkPermissions();
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
export const removeTechnology = new ValidatedMethod({
  name: 'organizations.removeTechnology',
  validate({ orgId, technologyId }) {
    check(orgId, String);
    check(technologyId, String);
  },
  run({ orgId, technologyId }) {
    checkPermissions();
    return Technologies.update({
      _id: technologyId
    }, {
      $pull: {
        organizationsId: orgId
      }
    });
  }
});

export const addAttachment = new ValidatedMethod({
  name: 'organizations.addAttachment',
  validate({ orgId, attachmentId }) {
    check(attachmentId, String);
    check(orgId, String);
  },
  run({ orgId, attachmentId }) {
    checkPermissions();
    return Organizations.update({
      _id: orgId
    }, {
      $addToSet: {
        attachmentsId: attachmentId
      }
    });
  }
});

export const removeAttachment = new ValidatedMethod({
  name: 'organizations.removeAttachment',
  validate({ orgId, attachmentId }) {
    check(attachmentId, String);
    check(orgId, String);
  },
  run({ orgId, attachmentId }) {
    checkPermissions();
    return Organizations.update({
      _id: orgId
    }, {
      $pull: {
        attachmentsId: attachmentId
      }
    });
  }
});

export const addKeyPeople = new ValidatedMethod({
  name: 'organizations.addKeyPeople',
  validate({ orgId, peopleDoc }) {
    check(peopleDoc, KeyPeopleSchema);
    check(orgId, String);
  },
  run({ orgId, peopleDoc }) {
    if (Meteor.isServer) {
      chance = new Chance();
      doc._id = chance.string();
    }

    checkPermissions();
    return Organizations.update({
      _id: orgId
    }, {
      $push: {
        keyPeople: doc
      }
    });
  }
});

export const removeKeyPeople = new ValidatedMethod({
  name: 'organziations.removeKeyPeople',
  validate({ orgId, peopleId }) {
    check(orgId, String);
    check(peopleId, String);
  },
  run({ orgId, peopleId }) {
    checkPermissions();
    return Organizations.update({
      _id: orgId
    }, {
      $pull: {
        keyPeople: {
          _id: peopleId
        }
      }
    });
  }
});

export const setLogo = new ValidatedMethod({
  name: 'organizations.setLogo',
  validate({ orgId, imageId }) {
    check(orgId, String);
    check(imageId, String);
  },
  run({ orgId, imageId }) {
    checkPermissions();
    return Organizations.update({
      _id: orgId
    }, {
      $set: {
        logo: imageId
      }
    });
  }
});
