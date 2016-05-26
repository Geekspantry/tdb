import { Template } from 'meteor/templating';
import './main_dashboard.html';

Template.mainDashboard.onCreated(function() {
  this.subscribe('docCounter');
});
