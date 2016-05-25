import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Autoform } from 'meteor/aldeed:autoform';

import './users_edit_bio.html';
AutoForm.hooks({
  updateBioForm: {
    onSuccess() {
      toastr.success('Profile updated successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
