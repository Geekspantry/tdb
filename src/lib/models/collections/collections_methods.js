import { Projects } from '../../../imports/api/projects/Projects';

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

Collections.methods.remove = new ValidatedMethod({
  name: 'Collections.methods.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    check(_id, String);
    checkPermissions();
    // Delete the collection and all it's children
    return Collections.remove({
      $or: [{
        _id: _id
      }, {
        parentId: _id
      }]
    });
  }
});

Collections.methods.copy = new ValidatedMethod({
  name: 'Collections.methods.copy',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    check(_id, String);
    checkPermissions();

    let collection = Collections.findOne({
      _id: _id
    });

    delete collection._id;
    delete collection.updatedAt;
    delete collection.createdAt;
    delete collection.updatedBy;

    collection.name = `${collection.name} Copy`;
    return Collections.insert(collection);
  }
});


Collections.methods.update = new ValidatedMethod({
  name: 'Collections.methods.update',
  validate: new SimpleSchema({
    _id: { type: String },
    modifier: { type: Object, blackbox: true }
  }).validator(),
  run({ _id, modifier }) {
    checkPermissions();
    return Collections.update(_id, modifier);
  }
});

Collections.methods.pushTechnology = new ValidatedMethod({
  name: 'Collections.methods.pushTechnology',
  validate({ collectionId, techId, position }) {
    check(collectionId, String);
    check(techId, String);
    check(position, Match.Maybe(Number));
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

Collections.methods.pullTechnology = new ValidatedMethod({
  name: 'Collections.methods.pullTechnology',
  validate({ source, techId }) {
    check(source, String);
    check(techId, String);
  },
  run({ source, techId }) {
    return Collections.update({
      _id: source
    }, {
      $pull: {
        technologiesId: techId
      }
    });
  }
});


Collections.methods.moveTechnology = new ValidatedMethod({
  name: 'Collections.methods.moveTechnology',
  validate({ source, target, techId, position }) {
    check(source, String);
    check(target, String);
    check(techId, String);
    check(position, Match.Maybe(Number));
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
    if (source !== target && _.contains(targetCollection.technologiesId, techId)) {
      throw new Meteor.Error('target-already-has-tech');
    }

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
