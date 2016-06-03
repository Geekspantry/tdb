import { Projects } from '../../../../imports/api/projects/projects';
import { Technologies } from '../../../../imports/api/technologies/technologies';

Template.attachmentAboutBox.helpers({
  user() {
    return Meteor.users.findOne({
      _id: this.createdBy
    });
  },

 
  awsUrl() {
    return `https://s3.amazonaws.com/envisioning/${Meteor.settings.public.AWS_S3_FOLDER}/files/${this.file._id}`;
  }
});

Template.attachmentAboutBox.events({
  'click #attachment-edit': function() {
    Modal.show('attachmentsEdit', {
      attachmentId: this._id,
    });
  }
});
