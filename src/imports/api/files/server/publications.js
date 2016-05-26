import { Meteor } from 'meteor/meteor';
import { Files } from './files.js';
Meteor.publish('files.single', function(fileId) {
  check(fileId, String);
  return Files.find({_id: fileId});
});
