/*import { Technologies } from '../../imports/api/technologies/technologies';

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

Meteor.publish('projects.quickList', function() {
  return Projects.find({}, {
    fields: {
      name: 1
    }
  });
});


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

Meteor.publish('last-project-added', function() {
  return Projects.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});
*/