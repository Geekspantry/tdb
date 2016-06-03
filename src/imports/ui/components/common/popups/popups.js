import 'meteor/kevohagan:sweetalert';

function removeConfirmation(text = 'Are you sure you want to delete this?', callback, closeOnConfirm = true) {
  swal({
    title: 'Are you sure?',
    text: text,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes',
    closeOnConfirm: closeOnConfirm,
    html: true
  }, () => {
    callback();
  });
}

function removeSuccess(text = 'Your document has been deleted.') {
  swal({
    title: 'Deleted!',
    text: text,
    type: 'success',
    closeOnConfirm: true
  });
}

function removeError(text = 'Something went wrong and your document has not been deleted.') {
  swal({
    title: 'Error!',
    text: text,
    type: 'error',
    closeOnConfirm: true
  });
}

export default {
  removeConfirmation,
  removeSuccess,
  removeError
};
