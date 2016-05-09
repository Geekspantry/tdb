import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AutoForm } from 'meteor/aldeed:autoform';
import { ReactiveVar } from 'meteor/reactive-var';

import { insert } from '../../../../api/projects/methods.js';
import { popups } from '../../common/popups/popups';

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
    let text = `Are you sure you want to delete ${TagStripper.strip(template.data.name)}?`;
    popups.removeConfirmation(text, () => {
      insert.call(template.data._id, (err, res) => {
        if (err) return removeError();
        popups.removeSuccess();
        template.state.set('deleted');
      });
    });
  }
});
