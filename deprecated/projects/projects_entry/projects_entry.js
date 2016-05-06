import { Template } from 'meteor/templating';
import { Projects } from '../../../../api/projects/projects';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './projects_entry.html';

Template.projectsEntry.onCreated(function() {
  this.subscribe('projects.single', FlowRouter.getParam('id'));
});

Template.projectsEntry.helpers({
  project() {
    return Projects.findOne({
      _id: FlowRouter.getParam('id')
    });
  },
  projectCollections() {
    return Collections.find({
      projectId: FlowRouter.getParam('id')
    });
  },
});
