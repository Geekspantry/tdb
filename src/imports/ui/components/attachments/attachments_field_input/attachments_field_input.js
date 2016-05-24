import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import './attachments_field_input.html';

Template.attachmentsFieldInput.events({
  'click .btn-create-attachment': function(e) {
    e.preventDefault();
    Modal.show('attachmentsAddModal');
  }
});

Template.attachmentsFieldInput.helpers({
  name() {
    return Template.instance().data.name;
  }
});

Template.attachmentsFieldInput.onCreated(function() {
  this.subscribe('attachments.quickList');
});
