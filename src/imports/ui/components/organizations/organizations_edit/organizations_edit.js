import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AutoForm } from 'meteor/aldeed:autoform';
import 'meteor/chrismbeckett:toastr';
import { Organizations } from '/imports/api/organizations/organizations';
import './organizations_edit.html';

AutoForm.hooks({
  updateOrganizationForm: {
    onSuccess() {
      toastr.success('Organization updated successfully', 'Success');
      FlowRouter.go('organizations.entry', {id: FlowRouter.getParam('id')});
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.organizationsEdit.onCreated(function() {
  this.subscribe('organizations.single', FlowRouter.getParam('id'));
  this.subscribe('projects.quickList');
  this.subscribe('technologies.quickList');
  this.subscribe('attachments.quickList');
});

Template.organizationsEdit.helpers({
  organizationsCollection: ()=> Organizations,
  organization() {
    return Organizations.findOne(FlowRouter.getParam('id'));
  }
});
