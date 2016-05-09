/**
 * Projects Collection
 */

import { Mongo } from 'meteor/mongo';
import { ProjectSchema } from './schema.js';
import { CollectionsSet } from '../collections_set/collections_set';

export const Projects = new Mongo.Collection('projects');

Projects.attachSchema(ProjectSchema);
Projects.attachBehaviour('timestampable');

Projects.helpers({
  filteredTechStash(query) {
    return this.technologiesStash && Technologies.find({
      _id: {$in: this.technologiesStash},
      ...query
    });
  },
  /**
   * Finds all CollectionsSet that have this project as it's projectId
   * @return {Cursor} Array<CollectionSet>
   */
  getCollectionsSet() {
    return CollectionsSet.find({
      projectId: this._id
    });
  },
  /**
   * Finds all Organizations that have this project on it's array of projectsId
   * @return {Cursor} Array<Organization>
   */
  getOrganizations() {
    return Organizations.find({
      projectsId: this._id
    });
  },
  /**
   * Finds all the Users that have this project on it's array of projectsId
   * @return {Cursor} Array<Meteor.Users>
   */
  getParticipants() {
    return Meteor.users.find({
      projectsId: this._id
    });
  }
});
