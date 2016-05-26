import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Projects } from '/imports/api/projects/projects';
import { Images } from '/imports/api/images/images';

Meteor.publish('users.enrollAccount', function(token) {
  check(token, String);
  return Meteor.users.find({
    'services.password.reset.token': token
  });
});


// TODO: SECURITY
/*Meteor.publish('singleUser', function(userId) {
  check(userId, String);

  return Meteor.users.find({
    _id: userId
  });
});*/


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
        return null;
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
              name: 1,
              status: 1,
              description: 1
            }
          });
        }
        return null;
      }
    }]
  };
});


Meteor.publish('users.roles', function() {
  return Meteor.users.find({}, {
    fields: {
      roles: 1
    }
  });
});

Meteor.publish('users.status', function(userId) {
  check(userId, String);
  return Meteor.users.find({
    _id: userId
  }, {
    fields: {
      status: 1
    }
  });
});

Meteor.publish('users.projects', function(userId) {
  check(userId, String);
  return Meteor.users.find({
    _id: userId
  }, {
    fields: {
      projectsId: 1
    }
  });
});

Meteor.publish('users.info', function(userId) {
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
