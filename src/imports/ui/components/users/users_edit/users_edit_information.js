import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './users_edit_information.html';

AutoForm.hooks({
  updateUserInformationForm: {
    onSuccess() {
      toastr.success('Profile updated successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});


Template.usersEditInformation.onRendered(function() {
  this.subscribe('users.info', this.data.userId);
});
Template.usersEditInformation.helpers({
  user() {
    return Meteor.users.findOne(Template.instance().data.userId);
  }
});
