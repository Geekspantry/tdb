Template.organizationsDashboardStat.onCreated(function() {
  this.subscribe('last-organization-added');
  this.subscribe('organizations-counter');
});

Template.organizationsDashboardStat.helpers({
  totalCount() {
    return Counts.get('organizations-total');
  },
  lastOrganizationAdded() {
    return Organizations.findOne({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});

