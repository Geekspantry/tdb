import { Meteor } from 'meteor/meteor';
import { Images } from '../images.js';

Meteor.publish('images.single', function(imageId) {
  check(imageId, String);
  return Images.find({_id: imageId});
});
