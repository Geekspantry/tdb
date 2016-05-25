import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { remove } from '/imports/api/projects/methods';
import './projects_about_box.html';

Template.projectsAboutBox.helpers({
  techReviewCount() {
    return Counts.get('project-tech-stash-review');
  },
  deleteOptions() {
    let template = Template.instance();
    return {
      class: 'btn btn-danger btn-block btn-outline btn-sm',
      _id: template.data._id,
      method: remove,
      name: template.data.name,
      successCallback() {
        FlowRouter.go('organizations.dashboard');
      }
    };
  }
});

Template.projectsAboutBox.onCreated(function() {
  this.subscribe('project-tech-stash', Template.instance().data._id);
});
