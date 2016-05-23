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
        Meteor.call('Organizations.methods.setLogo', FlowRouter.getParam('id'), file._id);
      },
      crop: false
      
    });
  }
});
