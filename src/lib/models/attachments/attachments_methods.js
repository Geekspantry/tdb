Attachments.methods = {};

Attachments.methods.add = new ValidatedMethod({
  name: 'Attachments.methods.add',
  validate: Schemas.Attachment.validator(),
  run(doc) {
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
      return Attachments.insert(doc);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});
Attachments.methods.update = new ValidatedMethod({
  name: 'Attachments.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
      return Attachments.update(_id, modifier);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});

Meteor.methods({
  'Attachments.methods.remove': function(attchId) {
    check(attchId, String);
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
      return Attachments.remove({ _id: attchId });
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});
