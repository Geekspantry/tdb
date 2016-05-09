import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Projects } from '../../../../api/projects/Projects';

import './projects_dashboard_stat.html';

Template.projectsDashboardStat.onCreated(function() {
  this.subscribe('projects-status-counter');
  this.subscribe('last-project-added');
});

Template.projectsDashboardStat.helpers({
  totalCount() {
    return Counts.get('projects-total');
  },
  openCount() {
    return Counts.get('projects-open');
  },
  prospectCount() {
    return Counts.get('projects-prospect');
  },
  closedCount() {
    return Counts.get('projects-closed');
  },
  lastProjectAdded() {
    return Projects.findOne({}, {
      sort: {
        createdAt: -1
      },
      limit: 1
    });
  }
});

