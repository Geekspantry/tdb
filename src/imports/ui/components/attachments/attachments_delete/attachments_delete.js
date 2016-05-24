import { Template } from 'meteor/templating';
import popups from '/imports/ui/components/common/popups/popups';
import { remove } from '/imports/api/attachments/methods';

import './attachments_delete.html';

Template.attachmentsDelete.onCreated(function() {

})
Template.attachmentsDelete.events({
  'click [data-action="delete"]': function(event, template) {
    event.preventDefault();
    
    const name = template.data.name;
    const successCallback = template.data.successCallback || function() {};
    const errorCallback = template.data.errorCallback || function() {};
    const _id = template.data._id || '';

    const popupMessage =
      `Are you sure you want to delete <b>${name}</b>?
    You will not be able to undo this action.`;

    popups.removeConfirmation(popupMessage, () => {
      remove.call({ _id: _id }, (err, res) => {
        if (err) {
        	toastr.error(`Could not delete ${name}!`, 'Error');
        	errorCallback(err, null);
          return;
        }

        toastr.success(`${name} deleted!`, 'Success');
        successCallback(null, res);
      });
    });
  }
});

