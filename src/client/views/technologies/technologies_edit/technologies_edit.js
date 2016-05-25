import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import popups from '/imports/ui/components/common/popups/popups';
import { Technologies } from '/imports/api/technologies/technologies';
import { Organizations } from '/imports/api/organizations/organizations';

AutoForm.hooks({
  'update-technologies-form': {
    onSuccess() {
      toastr.success(`Technology updated successfully`, 'Success');
      FlowRouter.go('technologies.entry', {id: FlowRouter.getParam('id') });
    },
    onError(formType, error) {
      console.error(error);
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

Template.technologiesEdit.events({
  'click [data-action="delete"]': function(e, t) {
    const _id = FlowRouter.getParam('id');
    const tech = Technologies.findOne(_id);
    const popupMessage =
      `Are you sure you want to delete <b>${tech.name}</b>?
 You will not be able to undo this action.`;

    popups.removeConfirmation(popupMessage, () => {
      toastr.info(`${tech.name} will be deleted in the next seconds`, 'Alert');
      FlowRouter.go('technologies.dashboard');

      Meteor.call('technologies.remove', { _id }, (err, res) => {
        if (err) {
          toastr.error(err.error, 'Error');
          throw err;
        }

        toastr.success(`${tech.name} deleted!`, 'Success');
      });
    }, true);
  },
  'click [data-action="cancel"]': function(e, t) {
    swal({
      title: 'Are you sure?',
      text: 'Cancel <b>editing</b> will discard all your changes.',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      closeOnConfirm: true,
      html: true
    }, () => {
      FlowRouter.go('technologies.entry', { id: FlowRouter.getParam('id') });
    });
  }
});

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
