Organizations.methods = {};

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}

Organizations.methods.add = new ValidatedMethod({
  name: 'Organizations.methods.add',
  validate: Schemas.Organization.validator(),
  run(doc) {
    checkPermissions();
    return Organizations.insert(doc);
  }
});


Organizations.methods.update = new ValidatedMethod({
  name: 'Organizations.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    checkPermissions();
    return Organizations.update(_id, modifier);
  }
});

Meteor.methods({
  'Organizations.methods.remove': function(orgId) {
    check(orgId, String);
    checkPermissions();
    return Organizations.remove({
      _id: orgId
    });
  }
});


Meteor.methods({
  'Organizations.methods.addProject': function(orgId, projectId) {
    check(projectId, String);
    check(orgId, String);
    checkPermissions();
    Organizations.update({
      _id: orgId
    }, {
      $addToSet: {
        projectsId: projectId
      }
    });
  },
  'Organizations.methods.removeProject': function(orgId, projectId) {
    check(projectId, String);
    check(orgId, String);
    checkPermissions();
    Organizations.update({
      _id: orgId
    }, {
      $pull: {
        projectsId: projectId
      }
    });
  },
  'Organizations.methods.addTechnology': function(orgId, techId) {
    check(techId, String);
    check(orgId, String);
    checkPermissions();
    Organizations.update({
      _id: orgId
    }, {
      $addToSet: {
        technologiesId: techId
      }
    });
  },
  'Organizations.methods.removeTechnology': function(orgId, techId) {
    check(techId, String);
    check(orgId, String);
    checkPermissions();
    Organizations.update({
      _id: orgId
    }, {
      $pull: {
        technologiesId: techId
      }
    });
  },
  'Organizations.methods.addAttachment': function(orgId, attchId) {
    check(attchId, String);
    check(orgId, String);
    checkPermissions();
    Organizations.update({
      _id: orgId
    }, {
      $addToSet: {
        attachmentsId: attchId
      }
    });
  },
  'Organizations.methods.removeAttachment': function(orgId, attchId) {
    check(attchId, String);
    check(orgId, String);
    checkPermissions();
    Organizations.update({
      _id: orgId
    }, {
      $pull: {
        attachmentsId: attchId
      }
    });
  },
  'Organizations.methods.setLogo': function(orgId, imageId) {
    check(orgId, String);
    check(imageId, String);
    checkPermissions();
    Organizations.update({
      _id: orgId
    }, {
      $set: {
        logo: imageId
      }
    });
  },
  'Organizations.methods.addKeyPeople': function(orgId, doc) {
    if (Meteor.isServer) {
      chance = new Chance();
      doc._id = chance.string();
    }
    check(orgId, String);
    check(doc, Schemas.KeyPeople);
    return Organizations.update({
      _id: orgId
    }, {
      $push: {
        keyPeople: doc
      }
    });
  },
  'Organizations.methods.removeKeyPeople': function(orgId, peopleId) {
    check(orgId, String);
    check(peopleId, String);

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
