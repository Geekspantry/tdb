AutoForm.hooks({
  inviteUsersForm: {
    onSuccess: function(formType, result) {
      toastr.success('The invitation has been sent to ' + this.insertDoc.email, 'Success');
    },
    onError: function(formType, error) {
      toastr.error(error.error, 'Error');
    },
  }
});
