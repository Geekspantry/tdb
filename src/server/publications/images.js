Meteor.publish('images.single', function(imageId) {
  check(imageId, String);
  return Images.find({_id: imageId});
});
