import { Template } from 'meteor/templating';
import './manage_user_projects.html';

Template.manageUserProjects.helpers({
  projects() {
    return SearchSources.globalSearch.getTransformedData();
  },
  getOptions() {
    return {
      types: ['projects']
    };
  },
  user() {
    let user = Meteor.users.findOne({
      _id: Template.instance().data.userId
    });

    return user;
  },
});


Template.manageUserProjects.onCreated(function() {
  this.subscribe('user.projects', this.data.userId);
});
