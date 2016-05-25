import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Collections } from '../collections.js';
import { Technologies } from '/imports/api/technologies/technologies.js';

Meteor.publishComposite('collections.single', function(collectionId) {
  return {
    find() {
      return Collections.find({ _id: collectionId });
    },
    children: [{
      find(collection) {
        return Collections.find({ parentId: collection._id });
      }
    }, {
      find(collection) {
        if (collection.technologiesId && collections.technologiesId.length) {
          return Technologies.find({
            _id: { $in: collection.technologiesId }
          });
        }
        return null;
      }
    }]
  };
});

Meteor.publish('collections.single.noChildren', function(collectionId) {
  check(collectionId, String);
  return Collections.find({
    _id: collectionId
  });
});
