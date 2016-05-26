import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './users_dashboard_stat.html';

Template.usersDashboardStat.onCreated(function() {
  this.subscribe('users-roles-counter');
});

Template.usersDashboardStat.helpers({
  adminCount() {
    return Counts.get('users-admin');
  },
  editorCount() {
    return Counts.get('users-editor');
  },
  viewerCount() {
    return Counts.get('users-viewer');
  }
});
