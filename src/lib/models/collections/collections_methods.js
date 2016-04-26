function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}


Collections.methods = {};

Collections.methods.add = new ValidatedMethod({
  name: 'Collections.methods.add',
  validate: Schemas.Collection.validator(),
  run(doc) {
    checkPermissions();
    return Collections.insert(doc);
  }
});


Collections.methods.pushTechnology = new ValidatedMethod({
  name: 'Collections.methods.pushTechnology',
  validate({ collectionId, techId, position }) {
    check(collectionId, String);
    check(techId, String);
    check(position, Match.Optional(Number));
  },
  run({ collectionId, techId, position }) {
    let pushedObj = { $each: [techId] };
    if (position !== null && position >= 0) pushedObj.$position = position;


    let targetCollection = Collections.findOne({
      _id: collectionId
    });
    
    if (!targetCollection) throw new Meteor.Error('target-not-found');
    if (_.contains(targetCollection.technologiesId, techId)) throw new Meteor.Error('target-already-has-tech');

    return Collections.update({
      _id: collectionId
    }, {
      $push: {
        technologiesId: pushedObj
      }
    });
  }
});


Collections.methods.moveTechnology = new ValidatedMethod({
  name: 'Collections.methods.moveTechnology',
  validate({ source, target, techId, position}) {
    check(source, String);
    check(target, String);
    check(techId, String);
    check(position, Match.Optional(Number));
  },
  run({ source, target, techId, position }) {
    let sourceCollection = Collections.findOne({
      _id: source
    });

    if (!sourceCollection) throw new Meteor.Error('source-not-found');
    if (!_.contains(sourceCollection.technologiesId, techId)) throw new Meteor.Error('not-in-source');

    let targetCollection = Collections.findOne({
      _id: target
    });

    if (!targetCollection) throw new Meteor.Error('target-not-found');
    if (source !== target && _.contains(targetCollection.technologiesId, techId)) throw new Meteor.Error('target-already-has-tech');

    let sourceUpdate = Collections.update({
      _id: source
    }, {
      $pull: {
        technologiesId: techId
      }
    });

    if (!sourceUpdate) throw new Meteor.Error('source-update-error');

    let pushedObj = { $each: [techId] };
    if (position !== null && position >= 0) pushedObj.$position = position;

    let targetUpdate = Collections.update({
      _id: target
    }, {
      $push: {
        technologiesId: pushedObj
      }
    });

    if (!targetUpdate) throw new Meteor.Error('source-update-error');

    return true;
  }
});
