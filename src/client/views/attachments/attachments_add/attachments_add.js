onAddAttachmentSuccess = function(doc) {
  let currentRoute = FlowRouter.getRouteName();

  toastr.success('Attachment created successfully: ' + doc.name, 'Success');

  let modalRoutes = [
  	'organizations.add',
  	'organizations.edit',
  	'technologies.add',
  	'technologies.edit',
  	'projects.add',
  	'projects.edit',
  ]

  if (_.contains(modalRoutes, currentRoute)) {
    Modal.hide();
  } else {
    FlowRouter.go('attachments.dashboard');
  }

};
