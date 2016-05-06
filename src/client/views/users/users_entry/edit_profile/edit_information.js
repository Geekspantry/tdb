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


Template.editInformation.onRendered(function() {
  this.subscribe('users.info', this.data.userId);
});
Template.editInformation.helpers({
  user() {
    return Meteor.users.findOne(Template.instance().data.userId);
  }
});
