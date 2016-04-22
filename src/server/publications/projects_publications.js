Meteor.publishComposite('tabularProjectsList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      return Projects.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
  };
});


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
      }
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


/*Meteor.publishComposite('projects.techStash', function(projectId) {
  check(projectId, String);
  return {
    find() {
      return Projects.find({
        _id: projectId
      }, {
        fields: {
          technologiesStash: 1
        }
      });
    },
    children: [{
      find(project) {

      }
    }]
  };
});
*/