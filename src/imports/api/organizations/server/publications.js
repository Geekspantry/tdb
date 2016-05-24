import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Attachments } from '/imports/api/attachments/attachments.js';
import { Technologies } from '/imports/api/technologies/technologies.js';
import { Projects } from '/imports/api/projects/projects';
import { Organizations } from '../organizations';


Meteor.publishComposite('organizations.single', function(organizationId) {
  check(organizationId, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      return Organizations.find({
        _id: organizationId
      });
    },
    children: [{
      find(org) {
        return Projects.find({
          organizationsId: org._id
        });
      }
    }, {
      find(org) {
        return Technologies.find({
          organizationsId: org._id
        });
      }
    }, {
      find(org) {
        return org.attachmentsId && Attachments.find({
          _id: {
            $in: org.attachmentsId
          }
        });
      }
    }, {
      find(org) {
        if (org.logo) {
          return Images.find({
            _id: org.logo
          });
        }
        return null;
      }
    }]
  };
});

Meteor.publish('organizations.keyPeople', function(orgId) {
  check(orgId, String);
  return Organizations.find({
    _id: orgId
  }, {
    fields: {
      keyPeople: 1
    }
  });
});

Meteor.publish('organizations.quickList', function() {
  return Organizations.find({}, {
    fields: {
      name: 1
    }
  });
});

Meteor.publish('last-organization-added', function() {
  return Organizations.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});


Meteor.publish('organizations-counter', function() {
  Counts.publish(this, 'organizations-total', Organizations.find());
});

Meteor.publish('organization-relations-counter', function(organizationId) {
  check(organizationId, String);
  Counts.publish(this, 'organization-technologies-' + organizationId, Technologies.find({
    organizationsId: organizationId
  }));
  Counts.publish(this, 'organization-projects-' + organizationId, Projects.find({
    organizationsId: organizationId
  }));
  Counts.publish(this, 'organization-attachments-' + organizationId, Organizations.find({
    _id: organizationId
  }), { countFromFieldLength: 'attachmentsId' });
});
