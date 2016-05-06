import { Template } from 'meteor/templating';

import './tech_stash_add_item.html';

Template.techStashAddItem.events({
  'click .select-item': function(event, template) {
    template.data.onClick && template.data.onClick(this._id);
  }
});
