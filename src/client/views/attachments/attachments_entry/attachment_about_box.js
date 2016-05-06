Template.attachmentAboutBox.helpers({
  user() {
    return Meteor.users.findOne({
      _id: this.createdBy
    });
  },

  relatedProjects() {
    return Projects.find({
      attachmentsId: {
        $in: [this._id]
      }
    });
  },
  relatedTechnologies() {
    return Technologies.find({
      attachmentsId: {
        $in: [this._id]
      }
    });
  },
  relatedOrganizations() {
    return Organizations.find({
      attachmentsId: {
        $in: [Template.instance().data._id]
      }
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
