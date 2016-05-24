import { Template } from 'meteor/templating';
import {addAttachment, removeAttachment} from '/imports/api/organizations/methods.js';
import { Organizations } from '/imports/api/organizations/organizations';
import './manage_org_attachments_item.html';

Template.manageOrgAttachmentsItem.helpers({
  inAttachment() {
    let organizationId = Template.instance().data.organizationId;
    let inAttachment = Organizations.findOne({
      _id: organizationId,
      attachmentsId: this._id
    });

    return inAttachment;
  },
});

Template.manageOrgAttachmentsItem.events({
  'click .add-attachment': function(e, t) {
    addAttachment.call({orgId: t.data.organizationId, attachmentId: this._id}, function(error) {
      if (error) {
        return toastr.error(error.toString(), 'Error');
      }
      return toastr.success('Attachment linked with organization successfuly', 'Success');
    });
  },
  'click .remove-attachment': function(e, t) {
    removeAttachment.call({orgId: t.data.organizationId, attachmentId: this._id}, function(error) {
      if (error) {
        return toastr.error(error.toString(), 'Error');
      }
      return toastr.success('Attachment linked with organization successfuly', 'Success');
    });
  }
});
