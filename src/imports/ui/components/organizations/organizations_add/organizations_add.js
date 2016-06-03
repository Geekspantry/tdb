import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AutoForm } from 'meteor/aldeed:autoform';
import 'meteor/chrismbeckett:toastr';
import { Organizations } from '/imports/api/organizations/organizations';
import './organizations_add.html';

AutoForm.hooks({
  insertOrganizationForm: {
    onSuccess() {
        toastr.success('Organization created successfully: ' + this.insertDoc.name, 'Success');
        FlowRouter.go('organizations.dashboard');
      },
      onError(formType, error) {
        toastr.error(error.toString(), 'Error');
      },
  }
});

Template.organizationsAdd.helpers({
  organizationsCollection: () => Organizations
});

Template.organizationsAdd.onCreated(function() {
	this.subscribe('projects.quickList');
  this.subscribe('technologies.quickList');
  this.subscribe('attachments.quickList');
});
