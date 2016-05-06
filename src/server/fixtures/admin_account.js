const ROLES = ['god', 'admin', 'editor', 'viewer'];
Meteor.startup(function() {
  //
  //  Add root
  //
  if (!Meteor.users.findOne({
      'emails.address': 'admin@admin.com'
    })) {
    let userId = Accounts.createUser({
      email: 'admin@admin.com',
      password: 'q1w2e3'
    });
    Roles.addUsersToRoles(userId, 'admin');
  }

  //
  //  Preserve only determined ROLES, add them if do not exist
  //
    Meteor.roles.remove({
      name: {$nin: ROLES}
    });  
  _.each(ROLES, function(role, index) {
    let existingRole = Meteor.roles.findOne({name: role});
    Meteor.roles.upsert({
      name: role
    }, {
      name: role,
      hierarchy: index
    });
  });
});
