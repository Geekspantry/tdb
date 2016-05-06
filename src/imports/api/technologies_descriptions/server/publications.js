import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TechnologiesDescriptions } from '../technologies_descriptions.js';

Meteor.publish('technologies_descriptions.single', function(_id) {
	check(_id, String);
  return TechnologiesDescriptions.find(_id);
});
