import { Template } from 'meteor/templating';
import { Technologies } from '../../../../api/technologies/technologies';
import { ReactiveVar } from 'meteor/reactive-var';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { regexHelpers } from '../../../lib/regex_helpers/regex_helpers.js';

import './tech_stash.html';


Template.techStash.events({
  'click .add-to-stash': function(event, template) {
    Modal.show('techStashAdd', {
      projectId: template.data.projectId
    });
  },
  'input .stash-filter': function(e, t) {
    t.filter.set($(e.target).val());
  }
});

Template.techStash.helpers({
  filteredTechnologiesStash() {
    let filteredProject = Projects.findOne({
      _id: this.projectId
    });
    return filteredProject.technologiesStash.filter(stash => regexHelpers.multiWordRegex(Template.instance().filter.get()).test(stash.techName));
  },
  getTechnology() {
    return Technologies.findOne(this.technologyId);
  }
});

Template.techStash.onRendered(function() {
  if (this.data.style === 'vertical') {
    let drake = Template.instance().data.drake;
    drake.containers.push(this.find('.stash-drag-area'));
  }
});

Template.techStash.onCreated(function() {
  this.filter = new ReactiveVar('');
});
