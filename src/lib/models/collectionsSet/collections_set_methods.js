CollectionsSet.methods = {};
function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}


CollectionsSet.methods.add = new ValidatedMethod({
  name: 'CollectionsSet.methods.add',
  validate: Schemas.CollectionsSet.validator(),
  run(doc) {
    return CollectionsSet.insert(doc);
  }
});

CollectionsSet.methods.remove = new ValidatedMethod({
  name: 'CollectionsSet.methods.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    check(_id, String);
    checkPermissions();
    CollectionsSet.remove({
      _id: _id
    });
    // Delete all the Collections inside of it.
    Collections.remove({
      collectionsSetId: _id
    });
  }
});
