import { AutoForm } from 'meteor/aldeed:autoform';
import 'meteor/chrismbeckett:toastr';
import { InviteSchema } from '/imports/api/users/schema.js';
import './users_invite.html';

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


Template.usersInvite.helpers({
	inviteSchema: () => InviteSchema
})
