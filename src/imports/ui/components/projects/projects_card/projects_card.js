import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AutoForm } from 'meteor/aldeed:autoform';
import { ReactiveVar } from 'meteor/reactive-var';

import { remove } from '/imports/api/projects/methods.js';
import popups from '/imports/ui/components/common/popups/popups';

import './projects_card_tools';
import './projects_card_footer';
import './projects_card_desc';

import './projects_card.html';

Template.projectsCard.onCreated(function() {
  this.state = new ReactiveVar();
});

Template.projectsCard.helpers({
  isDeleted() {
    return Template.instance().state.get() === 'deleted';
  }
});

Template.projectsCard.events({
  'click .delete': function(event, template) {
    event.preventDefault();
    let strippedName = TagStripper.strip(template.data.name);
    let text = `Are you sure you want to delete ${strippedName}?`;

    popups.removeConfirmation(text, () => {
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
