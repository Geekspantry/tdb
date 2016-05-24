import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Attachments } from '/imports/api/attachments/attachments';
import { Organizations } from '/imports/api/organizations/organizations';
import './organizations_attachments.html';

Template.orgAttachments.helpers({
  attachments() {
    let organizations = Organizations.findOne({
      _id: FlowRouter.getParam('id')
    });

    let attachmentsId = organizations.attachmentsId || [];
    return Attachments.find({
      _id: { $in: attachmentsId }
    });
  },
});

Template.orgAttachments.events({
  'click #manage-org-attachments': function() {
    Modal.show('manageOrgAttachments', {
      organizationId: FlowRouter.getParam('id')
    });
  }
});
