import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './projects_card_footer.html';

Template.projectsCardFooter.onCreated(function() {
  this.subscribe('project-relations-counter', this.data._id);
});

Template.projectsCardFooter.helpers({
  collectionsCount() {
    return Counts.get(`project-collections-${this._id}`);
  },
  technologiesStashCount() {
    return Counts.get(`project-technologies-stash-${this._id}`);
  },
  attachmentsCount() {
    return Counts.get(`project-attachments-${this._id}`);
  },
  onClickView() {
    let id = this._id;
    return () => {
      FlowRouter.go('projects.entry', {id: id});
    };
  }
});
