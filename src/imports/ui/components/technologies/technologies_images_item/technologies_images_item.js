/**
 * data: {
 *  @param {Integer} width
 *  @param {Integer} height
 *  @param {Schemas.Image} image
 *  @param {String} technologyId
 * }
 */

import { Template } from 'meteor/templating';
import './technologies_images_item.html';

Template.technologiesImagesItem.events({
  'click [data-action="set-showcased"]': function(event, template) {
    const imageId = template.data.image.src;
    const technologyId = template.data.technologyId;

    Meteor.call('technologies.updateShowcasedImage', {
      _id: technologyId,
      imageId: imageId
    }, (err, res) => {
      if (err) {
        toastr.error(err.error, 'Error');
        throw err;
      }
      toastr.success('Image updated successfully', 'Success');
    });
  }
});

Template.technologiesImagesItem.helpers({
  image: (src) => Images.findOne({ _id: Template.instance().data.image.src }),
  isShowcased() {
    return Template.instance().data.image.showcased;
  },
  imageOptions() {
    return {
      height: Template.instance().data.height,
      width: Template.instance().data.width
    };
  },
});
