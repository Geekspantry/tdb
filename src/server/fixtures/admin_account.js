const ROLES = ['admin', 'editor', 'viewer'];

Meteor.startup(function() {
  // Seed admin for development
  if (process.env.NODE_ENV === 'development') {
    if (!Meteor.users.findOne({
        'emails.address': 'admin@admin.com'
      })) {
      let userId = Accounts.createUser({
        email: 'admin@admin.com',
        password: 'q1w2e3'
      });
      Roles.addUsersToRoles(userId, 'admin');
    }
  }

  // Seed Roles
  Meteor.roles.remove({
    name: { $nin: ROLES }
  });
  _.each(ROLES, function(role, index) {
    let existingRole = Meteor.roles.findOne({ name: role });
    Meteor.roles.upsert({
      name: role
    }, {
      name: role,
      hierarchy: index
    });
  });
});
