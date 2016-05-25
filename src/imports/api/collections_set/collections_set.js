/**
 * CollectionsSet
 */
import { Mongo } from 'meteor/mongo';
import { CollectionsSetSchema } from './schema.js';
import { Projects } from '../projects/projects';
import { Collections } from '/imports/api/collections/collections';

export const CollectionsSet = new Mongo.Collection('collectionsSet');

CollectionsSet.attachSchema(CollectionsSetSchema);
CollectionsSet.attachBehaviour('timestampable');

CollectionsSet.helpers({
  project() {
    return Projects.findOne({
      _id: this.projectId
    });
  },
  // top level collections
  collections() {
    let col =  Collections.find({
      collectionsSetId: this._id,
      parentId: {
        $exists: false
      }
    });
    return col;
  }
});
