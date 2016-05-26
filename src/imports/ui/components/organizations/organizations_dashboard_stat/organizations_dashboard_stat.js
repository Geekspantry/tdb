import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Organizations } from '/imports/api/organizations/organizations';

import './organizations_dashboard_stat.html';

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

