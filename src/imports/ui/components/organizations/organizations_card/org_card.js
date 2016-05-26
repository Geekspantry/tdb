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
  },
  deleteOptions() {
    let template = Template.instance();
    return {
      _id: template.data._id,
      method: remove,
      name: TagStripper.strip(template.data.name),
      successCallback() {
        template.state.set('deleted');
      }
    };
  }
});
