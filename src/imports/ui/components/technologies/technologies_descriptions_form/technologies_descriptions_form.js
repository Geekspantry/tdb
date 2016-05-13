/**
 * context: {TechnologyDescriptionSchema}
 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { AutoForm } from 'meteor/aldeed:autoform';
import { TechnologiesDescriptions } from '../../../../api/technologies_descriptions/technologies_descriptions';

import './technologies_descriptions_form.html';

AutoForm.hooks({
  'update-technologies-descriptions-form': {
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
    onSuccess() {
      toastr.success('Description saved successfully');
      this.template.get('isEditing').set(false);
    },
  },
});

Template.technologiesDescriptionsForm.onCreated(function() {
  this.shortTextCounter = new ReactiveVar(this.data.shortText ? this.data.shortText.length : 0);
});

Template.technologiesDescriptionsForm.events({
  'keyup textarea[name="shortText"]': function(event, template) {
    template.shortTextCounter.set(event.target.value ? event.target.value.length : 0);
  }
});

Template.technologiesDescriptionsForm.helpers({
  technologiesDescriptionsCollection: () => TechnologiesDescriptions,
  shortTextCounter: () => Template.instance().shortTextCounter.get(),
});
