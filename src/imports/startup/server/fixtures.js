const ROLES = ['admin', 'editor', 'viewer'];
const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'q1w2e3';
const ADMIN_ROLE = 'admin';

Meteor.startup(function() {
  // Seed admin for development
  if (process.env.NODE_ENV === 'development') {
    if (!Meteor.users.findOne({
        'emails.address': ADMIN_EMAIL
      })) {
      let userId = Accounts.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });
      Roles.addUsersToRoles(userId, ADMIN_ROLE);
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
