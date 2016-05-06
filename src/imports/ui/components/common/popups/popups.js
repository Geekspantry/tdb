import { swal } from 'meteor/kevohagan:sweetalert';

export function removeConfirmationPopup(text = 'Are you sure you want to delete this?', callback) {
  swal({
    title: 'Are you sure?',
    text: text,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes',
    closeOnConfirm: false,
    html: true
  }, () => {
    callback();
  });
}

export function removeSuccess(text = 'Your document has been deleted.') {
  swal('Deleted!', text, 'success');
}

export function removeError(text = 'Something went wrong and your document has not been deleted.') {
  swal('Error!', text, 'error');
}