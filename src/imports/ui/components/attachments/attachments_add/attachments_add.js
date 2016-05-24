import './attachments_add.html';
import './attachments_add_from_upload.js';
import './attachments_add_from_url.js';
import './attachments_add_from_website.js';

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
  ];
  if (_.contains(modalRoutes, currentRoute)) {
    Modal.hide();
  } else {
    FlowRouter.go('attachments.dashboard');
  }
};
