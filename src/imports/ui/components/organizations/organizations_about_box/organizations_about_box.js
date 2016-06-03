import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { setLogo, remove } from '/imports/api/organizations/methods';
import './organizations_about_box.html';

const IMAGE_ASPECT_RATIO = 1;

Template.orgAboutBox.events({
  'click #add-people': function() {
    Modal.show('organizationsManageKeyPeople', {
      orgId: this._id
    });
  },
  'click #org-edit': function() {
    Modal.show('organizationsEditModal', {
      orgId: this._id
    });
  },
  'click .change-logo-image': function() {
    Modal.show('uploadFile', {
      onUpload(file) {
        setLogo.call({ orgId: FlowRouter.getParam('id'), imageId: file._id });
      },
      crop: false
    });
  }
});

Template.orgAboutBox.helpers({
  deleteOptions() {
    let template = Template.instance();
    return {
      class: 'btn btn-danger btn-block btn-outline btn-sm',
      _id: template.data._id,
      method: remove,
      name: template.data.name,
      successCallback() {
        FlowRouter.go('organizations.dashboard');
      }
    };
  }
});

