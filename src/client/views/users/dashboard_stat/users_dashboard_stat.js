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
