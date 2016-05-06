Meteor.publish('files.single', function(fileId) {
  check(fileId, String);
  return Files.find({_id: fileId});
});
