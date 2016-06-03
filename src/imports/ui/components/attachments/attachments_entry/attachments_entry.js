import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Attachments } from '/imports/api/attachments/attachments';
import './attachments_entry.html';

Template.attachmentsEntry.helpers({
  attachment: function() {
    let attachment = Attachments.findOne({
      _id: FlowRouter.getParam('id')
    });
    return attachment;
  },
});


Template.attachmentsEntry.onCreated(function() {
	this.autorun(() => {
    let attachmentId = FlowRouter.getParam('id');
    this.subscribe('attachments.single', attachmentId);
	});
});
