/**
 * CollectionsSet
 */
import { Mongo } from 'meteor/mongo';
import { CollectionsSetSchema } from './schema.js';
import { Projects } from '../projects/Projects';

export const CollectionsSet = new Mongo.Collection('collectionsSet');

CollectionsSet.attachSchema(Schemas.CollectionsSet);
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
