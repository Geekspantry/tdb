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
