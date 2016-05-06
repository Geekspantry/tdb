import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';

import { Technologies } from '../../../../imports/api/technologies/technologies';

AutoForm.hooks({
  'update-technologies-form': {
    onSuccess() {
      toastr.success(`Technology updated successfully`, 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.technologiesEdit.onCreated(function() {
  this.subscribe('technologies.single', FlowRouter.getParam('id'));
  this.subscribe('projects.quickList');
  this.subscribe('organizations.quickList');
  this.subscribe('attachments.quickList');
});

Template.technologiesEdit.events({});

Template.technologiesEdit.helpers({
  technologiesCollection: () => Technologies,
  tech() {
    return Technologies.findOne(FlowRouter.getParam('id'));
  },
  onUploadSuccess() {
    const template = Template.instance();
    return (fileObj) => {
      if (fileObj.hasStored('images')) {
        Meteor.call('technologies.linkImage', {
          _id: FlowRouter.getParam('id'),
          imageId: fileObj._id
        }, (err, res) => {
          if (err) {
            toastr.error(err.error, 'Error');
            throw err;
          }
          return toastr.success('Image added to technology successfully', 'Success');
        });
      }
    };
  }
});
