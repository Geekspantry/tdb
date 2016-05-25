import { Projects } from '/imports/api/projects/projects';
import { Technologies } from '/imports/api/technologies/technologies';
import { CollectionsSet } from '/imports/api/collections_set/collections_set';
import { Meteor } from 'meteor/meteor';

let collections = {
  Projects,
  Technologies,
  CollectionsSet,
  Users: Meteor.users
};

Template.registerHelper('Collections', () => collections);
