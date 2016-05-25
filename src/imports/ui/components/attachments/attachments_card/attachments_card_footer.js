import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';
import './attachments_card_footer.html';

Template.attachmentsCardFooter.onCreated(function() {
  this.subscribe('attachment-relations-counter', this.data._id);
});

Template.attachmentsCardFooter.helpers({
  technologiesCount() {
    return Counts.get(`attachment-technologies-${this._id}`);
  },
  organizationsCount() {
    return Counts.get(`attachment-organizations-${this._id}`);
  },
  projectsCount() {
    return Counts.get(`attachment-projects-${this._id}`);
  },
  onClickView() {
    let id = this._id;
    return () => {
      FlowRouter.go('attachments.entry', {id: id});
    };
  }
});
