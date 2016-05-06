Template.usersChangeImage.events({
  'change #select-image': function(e, tmpl) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(ev) {
      tmpl.currentImage.set(ev.target.result);
    };
  },
  'click #upload-image': function(e, tmpl) {
    let file = tmpl.currentImage.get();
    if (!file) return;
    let uploadedImage = Images.insert(file, function(err, fileObj) {
      if (err) {
        return toastr.error('Some error occurred', 'Error');
      }
      Meteor.call('Users.methods.setUserImage', FlowRouter.getParam('id'), fileObj._id);

      let cursor = Images.find(fileObj._id);
      let liveQuery = cursor.observe({
        changed(newImage) {
          if (newImage.isUploaded()) {
            liveQuery.stop();
            Meteor.setTimeout(() => {
              Modal.hide();
              return toastr.success('File uploaded!', 'Success');
            }, 1000);
          }
        }
      });
    });

    tmpl.uploadingImage.set(uploadedImage._id);
  },
  'click #take-photo': function(e, tmpl) {
    MeteorCamera.getPicture({
      quality: 100,
      width: 640,
      height: 360
    }, (err, data) => {
      if (err) {
        return toastr.error('Error taking photo', 'Error');
      }

      tmpl.currentImage.set(data);
    });
  }
});

Template.usersChangeImage.onCreated(function() {
  this.currentImage = new ReactiveVar;
  this.uploadingImage = new ReactiveVar;
});

Template.usersChangeImage.helpers({
  currentImage() {
    return Template.instance().currentImage.get();
  },
  uploadingImage() {
    return Template.instance().uploadingImage.get();
  }
});
