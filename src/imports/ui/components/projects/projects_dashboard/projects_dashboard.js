import { Template } from 'meteor/templating';

import './projects_dashboard.html';

Template.projectsDashboard.helpers({
  projectSelector() {
    return {
      collection: 'projects'
    };
  }
});
