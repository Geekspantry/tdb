import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './projects_about_box.html';

Template.projectsAboutBox.helpers({
  techReviewCount() {
    return Counts.get('project-tech-stash-review');
  }
});

Template.projectsAboutBox.onCreated(function() {
  this.subscribe('project-tech-stash', Template.instance().data._id);
});
