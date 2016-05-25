import { Template } from 'meteor/templating';
import { MeteorCamera } from 'meteor/mdg:camera-constraints';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { updateImage } from '/imports/api/users/methods';

import './upload_file.html';

const TAKE_PICTURE_QUALITY = 100;
const TAKE_PICTURE_WIDTH = 640;
const TAKE_PICTURE_HEIGHT = 360;

Template.uploadFile.events({
  'change #select-image': function(e, tmpl) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(ev) {
      tmpl.currentImage.set(ev.target.result);
    };
  },
  'click #upload-image': function(e, tmpl) {
    let imgData;
    if (tmpl.data.crop) {
      imgData = tmpl.croppedImage.cropper('getCroppedCanvas').toDataURL();
    } else {
      imgData = tmpl.currentImage.get();
    }
    if (!imgData) return;

    let uploadedImage = Images.insert(imgData, function(err, fileObj) {
      if (err) {
        toastr.error('Some error occurred', 'Error');
        return;
      }
      tmpl.data.onStartUpload(fileObj);

      tmpl.subscribe('images.single', fileObj._id);
      tmpl.uploadingImage.set(fileObj._id);

      tmpl.autorun(() => {
        let f = Images.findOne(fileObj._id);
        if (f && f.hasStored('images')) {
          tmpl.data.onUpload(f);
          Modal.hide();
        }
      });
    });
  },
  'click #take-photo': function(e, tmpl) {
    MeteorCamera.getPicture({
      quality: TAKE_PICTURE_QUALITY,
      width: TAKE_PICTURE_WIDTH,
      height: TAKE_PICTURE_HEIGHT
    }, (err, data) => {
      if (err) {
        toastr.error('Error taking photo', 'Error');
        return;
      }
      tmpl.currentImage.set(data);
    });
  }
});

Template.uploadFile.onCreated(function() {
  this.currentImage = new ReactiveVar;
  this.uploadingImage = new ReactiveVar;

  this.data.onStartUpload = this.data.onStartUpload || function() {};
  this.data.onUpload = this.data.onUpload || function() {};


  let tmpl = this;
});

Template.uploadFile.helpers({
  currentImage() {
    return Template.instance().currentImage.get();
  },
  uploadingImage() {
    return Template.instance().uploadingImage.get();
  },
  getCropper() {
    let tmpl = Template.instance();
    return function(cropper) {
      tmpl.croppedImage = cropper;
    };
  }
});
