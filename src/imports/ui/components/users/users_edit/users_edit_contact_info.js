import { Autoform } from 'meteor/aldeed:autoform';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import './users_edit_contact_info.html';
AutoForm.hooks({
  updateContactInfoForm: {
    onSuccess() {
      toastr.success('Profile updated successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
