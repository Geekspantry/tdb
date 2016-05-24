import { Template } from 'meteor/templating';
import popups from '/imports/ui/components/common/popups/popups';
import { remove } from '/imports/api/organizations/methods';

import './org_card_tools';
import './org_card_footer';
import './org_card_desc';

import './org_card.html';

Template.orgCard.onCreated(function() {
  this.state = new ReactiveVar();
});
Template.orgCard.helpers({
  isDeleted() {
    return Template.instance().state.get() === 'deleted';
  }
});


Template.orgCard.events({
  'click .delete': function(event, template) {
    event.preventDefault();

    const strippedName = TagStripper.strip(template.data.name);
    const popupMessage =
    `Are you sure you want to delete <b>${strippedName}</b>?
    You will not be able to undo this action.`;

    popups.removeConfirmation(popupMessage, () => {
      remove.call({_id: template.data._id}, (err, res) => {
        if (err) {
          popups.removeError();
          return;
        }

        toastr.success(`${strippedName} deleted!`, 'Success');
        template.state.set('deleted');
      });
    });
  }
});