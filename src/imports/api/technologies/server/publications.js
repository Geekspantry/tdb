import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Technologies } from '../technologies.js';
import { TechnologiesDescriptions } from '../../technologies_descriptions/technologies_descriptions';

/**
 * Publish as sigle technology
 * @param  {String} technologyId The technology _id.
 * @param  {Boolean} options.organizations  If {true}, publish the related organizations. Default {false}.
 * @param  {Boolean} options.projects If {true}, publish the related projects. Default {false}.
 * @param  {Boolean} options.attachments If {true}, publish the related attachments. Default {false}.
 */
Meteor.publishComposite('technologies.single', function(technologyId, options = {
  organizations: false,
  projects: false,
  attachments: false
}) {
  check(technologyId, String);
  check(options, Object);
  if (options.organizations !== undefined) check(options.organizations, Boolean);
  if (options.projects !== undefined) check(options.projects, Boolean);
  if (options.attachments !== undefined) check(options.attachments, Boolean);

  this.unblock();

  let children = [{
    find(technology) {
      if (technology.images) {
        let imagesId = _.pluck(technology.images, 'src') || [];
        return Images.find({
          _id: {
            $in: imagesId
          }
        });
      }
    },
  }, {
    find(technology) {
      return TechnologiesDescriptions.find({
        technologyId: technology._id
      });
    },
    children: [{
      find(description) {
        return Meteor.users.find({
          _id: {
            $in: [description.createdBy, description.updatedBy]
          }
        }, {
          fields: {
            'profile.fullName': 1
          }
        });
      }
    }]
  }];

  if (options.organizations) {
    children.push({
      find(technology) {
        return Organizations.find({ _id: { $in: technology.organizationsId || [] } });
      }
    });
  }

  if (options.projects) {
    children.push({
      find(technology) {
        return Projects.find({ _id: { $in: technology.projectsId || [] } });
      }
    });
  }

  if (options.attachments) {
    children.push({
      find(technology) {
        return Attachments.find({ _id: { $in: technology.attachmentsId || [] } });
      }
    });
  }

  return {
    find() {
      this.unblock();
      return Technologies.find({
        _id: technologyId
      });
    },
    children: children
  };
});

Meteor.publish('technologies.quickList', function() {
  return Technologies.find({}, {
    fields: {
      name: 1
    }
  });
});

Meteor.publish('technologies-status-counter', function() {
  Counts.publish(this, 'technologies-total', Technologies.find());
  Counts.publish(this, 'technologies-published', Technologies.find({
    status: 'published'
  }));
  Counts.publish(this, 'technologies-review', Technologies.find({
    status: 'review'
  }));
  Counts.publish(this, 'technologies-draft', Technologies.find({
    status: 'draft'
  }));
});

Meteor.publish('last-technology-added', function() {
  return Technologies.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});


Meteor.publish('technology.status', function(techId) {
  check(techId, String);

  return Technologies.find({
    _id: techId
  }, {
    fields: {
      status: 1
    }
  });
});

Meteor.publish('technology-relations-counter', function(technologyId) {
  check(technologyId, String);
  Counts.publish(this, 'technology-attachments-' + technologyId, Technologies.find({
    _id: technologyId
  }), { countFromFieldLength: 'attachmentsId' });

  Counts.publish(this, 'technology-projects-' + technologyId, Technologies.find({
    _id: technologyId
  }), { countFromFieldLength: 'projectsId' });

  Counts.publish(this, 'technology-organizations-' + technologyId, Technologies.find({
    _id: technologyId
  }), { countFromFieldLength: 'organizationsId' });
});
