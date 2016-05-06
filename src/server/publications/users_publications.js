Meteor.publish('user.enrollAccount', function(token) {
  check(token, String);
  return Meteor.users.find({
    'services.password.reset.token': token
  });
});


//
//  Publication da lista de users
//
Meteor.publishComposite('tabular_UsersList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'god'])) {
        return false;
      }

      return Meteor.users.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
  };
});

// TODO: SECURITY
Meteor.publish('singleUser', function(userId) {
  check(userId, String);

  return Meteor.users.find({
    _id: userId
  });
});


Meteor.publish('users.extraData', function() {
  return Meteor.users.find({
    _id: this.userId
  }, {
    fields: {
      roles: 1,
      status: 1,
      emails: 1,
      projectsId: 1
    }
  });
});


Meteor.publishComposite('users.single', function(userId) {
  check(userId, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      return Meteor.users.find({
        _id: userId
      });
    },
    children: [{
      find(user) {
        if (user.profile && user.profile.imageId) {
          return Images.find({
            _id: user.profile.imageId
          });
        }
      }
    }, {
      find(user) {
        if (user.projectsId) {
          return Projects.find({
            _id: {
              $in: user.projectsId
            }
          }, {
            fields: {
              name: 1
            }
          });
        }
      }
    }]
  };
});


Meteor.publish('Users.roles', function() {
  return Meteor.users.find({}, {
    fields: {
      roles: 1
    }
  });
});

Meteor.publish('user.status', function(userId) {
  check(userId, String);
  return Meteor.users.find({
    _id: userId
  }, {
    fields: {
      status: 1
    }
  });
});

Meteor.publish('user.projects', function(userId) {
  check(userId, String);
  return Meteor.users.find({
    _id: userId
  }, {
    fields: {
      projectsId: 1
    }
  });
});

Meteor.publish('user.info', function(userId) {
  check(userId, String);
  return Meteor.users.find({
    _id: userId
  }, {
    fields: {
      'profile.firstName': 1,
      'profile.lastName': 1,
      'profile.affiliation': 1,
      'profile.country': 1,
      'profile.birth': 1,
      'profile.gender': 1,
      'profile.address': 1
    }
  });
});


Meteor.publish('users-roles-counter', function() {
  Counts.publish(this, 'users-admin', Roles.getUsersInRole('admin'));
  Counts.publish(this, 'users-editor', Roles.getUsersInRole('editor'));
  Counts.publish(this, 'users-viewer', Roles.getUsersInRole('viewer'));
});
