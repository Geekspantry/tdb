import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { remove, updateImage } from '/imports/api/users/methods';

import './users_about_box.html';


const IMAGE_ASPECT_RATIO = 1;

Template.usersAboutBox.events({
  'click [data-action="manage-roles"]': function(e) {
    e.preventDefault();
    Modal.show('manageUsersRoles');
  },
  'click #edit-info': function(e) {
    e.preventDefault();
    Modal.show('usersEditInformation', {
      userId: this._id
    });
  },
  'click #edit-contact': function(e) {
    e.preventDefault();
    Modal.show('usersEditContactInfo', {
      user: this
    });
  },
  'click #edit-bio': function(e) {
    e.preventDefault();
    Modal.show('usersEditBio', {
      user: this
    });
  },
  'click .change-profile-image': function() {
    Modal.show('uploadFile', {
      onStartUpload(file) {},
      onUpload(file) {
        toastr.success('Upload finished', 'Success');
        updateImage.call({userId: FlowRouter.getParam('id'), imageId: file._id});
      },
      crop: false
    });
  },
/*  'click #delete-user': function() {
    confirmDeleteUser(() => {
      Meteor.call('Users.methods.remove', this._id, (err, res) => {
        if (err) {
          toastr.error(err.toString(), 'Error');
          return;
        }
        toastr.success('User removed successfully', 'Success');
        FlowRouter.go('users.dashboard');
      });
    });
  },*/
  'mouseenter .update-picture-icon': function() {
    $('.change-profile-image a').fadeIn();
  },
  'mouseleave .change-profile-image': function() {
    $('.change-profile-image a').fadeOut();
  }
});


Template.usersAboutBox.helpers({
  deleteOptions() {
    let template = Template.instance();
    return {
      class: 'btn btn-danger btn-block btn-outline btn-sm',
      _id: template.data._id,
      method: remove,
      name: template.data.name,
      successCallback() {
        FlowRouter.go('users.dashboard');
      }
    };
  }
});
