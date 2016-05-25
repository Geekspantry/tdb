import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { setLogo } from '/imports/api/organizations/methods';

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
        setLogo.call({orgId: FlowRouter.getParam('id'), imageId: file._id});
      },
      crop: false
    });
  }
});
