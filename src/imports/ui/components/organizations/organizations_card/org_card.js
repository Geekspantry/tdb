import { Template } from 'meteor/templating';

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

/*Template.orgCard.events({
  'click .delete': function(event, template) {
    event.preventDefault();

    removeConfirmation(TagStripper.strip(template.data.name), () => {
      Meteor.call('Organizations.methods.remove', template.data._id, (err, res) => {
        if (err) return removeError();
        removeSuccess();
        template.state.set('deleted');
      });
    });
  }
});
*/