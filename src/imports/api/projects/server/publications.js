import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Projects } from '../Projects.js';
import { Technologies } from '../../technologies/technologies.js';
import { CollectionsSet } from '../../collections_set/collections_set.js';

/**
 * Publish as single project
 * - Publishes related CollectionsSet
 * - Publishes related Organizations
 * - Publishes related Technologies
 * - Publishes related Collections
 * - Publishes related Users
 * @param  {String} projectId The project _id.
 */
Meteor.publishComposite('projects.single', function(projectId) {
  check(projectId, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      return Projects.find({
        _id: projectId
      });
    },
    children: [{
      find(project) {
        return CollectionsSet.find({ projectId: project._id });
      },
      children: [{
        find(collectionSet) {
          return Collections.find({
            collectionsSetId: collectionSet._id
          });
        }
      }]
    }, {
      find(project) {
        return Organizations.find({
          projectsId: project._id
        }, {
          fields: {
            name: 1,
            projectsId: 1
          }
        });
      }
    }, {
      find(project) {
        return Technologies.find({
          _id: { $in: _.pluck(project.technologiesStash, 'technologyId') }
        });
      },
      children: [{
        find(technology) {
          return Collections.find({
            technologiesId: technology._id
          });
        }
      }]
    }, {
      find(project) {
        return Meteor.users.find({
          projectsId: project._id
        }, {
          fields: {
            'profile.fullName': 1,
            emails: 1,
            username: 1,
            projectsId: 1
          }
        });
      }
    }]
  };
});

/**
 * Publish a quickList for projects
 * - This is used to populate simple select inputs with {label: name, value: _id}
 */

Meteor.publish('projects.quickList', function() {
  return Projects.find({}, {
    fields: {
      name: 1
    }
  });
});


/**
 * Publish a set of counters
 * - projects-total:    Total number of Projects
 * - projects-prospect: Total number of Projects with status: prospect
 * - projects-open:     Total number of Projects with status: open
 * - projects-closed:   Total number of Projects with status: closed
 */

Meteor.publish('projects-status-counter', function() {
  Counts.publish(this, 'projects-total', Projects.find());
  Counts.publish(this, 'projects-prospect', Projects.find({
    status: 'prospect'
  }));
  Counts.publish(this, 'projects-open', Projects.find({
    status: 'open'
  }));
  Counts.publish(this, 'projects-closed', Projects.find({
    status: 'closed'
  }));
});

/**
 * Publish a set of counters
 * - project-collections-<projectId>        : Total number of related Collections of <projectId>
 * - project-technologies-stash-<projectId> : Length of the array technologiesStash of <projectId>
 * - project-attachments-<projectId>        : Length of the array attachmentsId of <projectId>
 */

Meteor.publish('project-relations-counter', function(projectId) {
  check(projectId, String);
  Counts.publish(this, 'project-collections-' + projectId, Collections.find({
    projectId: projectId
  }));
  Counts.publish(this, 'project-technologies-stash-' + projectId, Projects.find({
    _id: projectId
  }), { countFromFieldLength: 'technologiesStash' });
  Counts.publish(this, 'project-attachments-' + projectId, Projects.find({
    _id: projectId
  }), { countFromFieldLength: 'attachmentsId' });
});

/**
 * I dont remember why this is here.
 */

Meteor.publish('project-tech-stash', function(projectId) {
  check(projectId, String);
  let project = Projects.findOne(projectId);
  let techIds = _.pluck(project.technologiesStash, 'technologyId');
  let cursor = Technologies.find({
    _id: { $in: techIds },
    status: 'review'
  });

  Counts.publish(this, 'project-tech-stash-review', cursor);
});

/**
 * Publish a single project, the last created one.
 */

Meteor.publish('last-project-added', function() {
  return Projects.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});
