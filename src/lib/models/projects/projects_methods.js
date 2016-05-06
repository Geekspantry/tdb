import { Technologies } from '../../../imports/api/technologies/technologies';

Projects.methods = {};

Projects.methods.add = new ValidatedMethod({
  name: 'Projects.methods.add',
  validate: Schemas.Project.validator(),
  run(doc) {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.insert(doc);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});


Projects.methods.update = new ValidatedMethod({
  name: 'Projects.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.update(_id, modifier);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});

Meteor.methods({
  'Projects.methods.remove': function(projectId) {
    check(projectId, String);
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.remove({ _id: projectId });
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});

Projects.methods.pushTechnologiesStash = new ValidatedMethod({
  name: 'Projects.methods.pushTechnologiesStash',
  validate({ projectId, techId }) {
    check(projectId, String);
    check(techId, String);
  },
  run({ projectId, techId }) {
    let project = Projects.findOne({
      _id: projectId,
      'technologiesStash.technologyId': techId
    });
    if (project) throw new Meteor.Error(500, 'Technology already on stash.');

    let tech = Technologies.findOne({
      _id: techId
    }, {
      fields: {
        name: 1
      }
    });
    if (Meteor.isServer && !tech) {
      throw new Meteor.Error(500, 'Technology not found.');
    }
    let techName = tech && tech.name;
    let stashedTech = {
      technologyId: techId,
      techName: techName,
      addedAt: new Date()
    };

    return Projects.update({
      _id: projectId
    }, {
      $addToSet: {
        technologiesStash: stashedTech
      },
      $inc: {
        technologiesStashCount: 1
      }
    });
  }
});

Projects.methods.pullTechnologiesStash = new ValidatedMethod({
  name: 'Projects.methods.pullTechnologiesStash',
  validate({ projectId, techId }) {
    check(projectId, String);
    check(techId, String);
  },
  run({ projectId, techId }) {
    return Projects.update({
      _id: projectId
    }, {
      $pull: {
        technologiesStash: {
          technologyId: techId
        }
      },
      $inc: {
        technologiesStashCount: -1
      }
    });
  }
});
