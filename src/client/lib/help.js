removeConfirmation = function(name, callback) {
  swal({
    title: 'Are you sure?',
    text: 'You will not be able to recover this document <b>"' + name + '"</b>.',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes',
    closeOnConfirm: false,
    html: true
  }, () => {
    callback();
  });
};

removeConfirmationPopup = function(text = 'Are you sure you want to delete this?', callback) {
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
};
removeConfirmationSuccess = function(text = 'Your document has been deleted.') {
  swal('Deleted!', text, 'success');
};
removeConfirmationError = function(text = 'Something went wrong and your document has not been deleted.') {
  swal('Error!', text, 'error');
};


removeSuccess = function() {
  swal('Deleted!', 'Your document has been deleted.', 'success');
};

removeError = function() {
  swal('Error!', 'Your document has not been deleted.', 'error');
};


handleTableClick = function(event, callback) {
    let dataTable = $(event.target).closest('table').DataTable();
    let rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    callback(rowData);
};
