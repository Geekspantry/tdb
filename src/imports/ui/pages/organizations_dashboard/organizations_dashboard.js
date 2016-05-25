import { Template } from 'meteor/templating';
import './organizations_dashboard.html';

Template.organizationsDashboard.helpers({
  organizationSelector() {
    return {
      collection: 'organizations'
    };
  }
});
