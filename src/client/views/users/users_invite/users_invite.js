AutoForm.hooks({
  inviteUsersForm: {

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      toastr.success('The invitation has been sent to ' + this.insertDoc.email, 'Success');
      FlowRouter.go('users.dashboard');
    },

    // Called when any submit operation fails
    onError: function(formType, error) {
      console.log(error)
      toastr.error(error);
    },
  }
});
