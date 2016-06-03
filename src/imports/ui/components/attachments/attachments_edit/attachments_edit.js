import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AutoForm } from 'meteor/aldeed:autoform';
import 'meteor/chrismbeckett:toastr';
import { Attachments } from '/imports/api/attachments/attachments';
import './attachments_edit.html';


AutoForm.hooks({
  updateAttachmentsForm: {
    onSuccess() {
      toastr.success('Attachment updated successfully', 'Success');
      if (this.template.data && typeof this.template.data.onSuccess === 'function') {
        this.template.data.onSuccess();
      }
      //this.template.parent().data.onSuccess();
      //Modal.hide();
      
      FlowRouter.go('attachments.entry', {id: FlowRouter.getParam('id')});
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.attachmentsEdit.onCreated(function() {
  this.autorun(() => {
    let attachmentId = FlowRouter.getParam('id');
    this.subscribe('attachments.single', attachmentId);
  });
});

Template.attachmentsEdit.helpers({
  attachmentsCollection: () => Attachments,
  attachment() {
    return Attachments.findOne(FlowRouter.getParam('id'));
  }
});


