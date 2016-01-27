Meteor.publishComposite('tabularOrganizationsList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      return Organizations.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
  };
});

Meteor.publish('organizations.single', function(organizationId) {
  check(organizationId, String);
  return Organizations.find({
    _id: organizationId
  });
});
