import { Template } from 'meteor/templating';
import './users_dashboard.html';

Template.usersDashboard.helpers({
  userRecentUpdatesSelector() {
    return {
      collection: 'users'
    };
  },
});
