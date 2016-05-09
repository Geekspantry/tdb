import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Projects } from '../../../../api/projects/Projects';
//  import { Collections } from '../../../../api/collections/Collections';

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
