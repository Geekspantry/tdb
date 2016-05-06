import { Technologies } from '../../../../imports/api/technologies/technologies';

AutoForm.hooks({
  'insert-technologies-form': {
    onSuccess(formType, result) {
      toastr.success('Technology created successfully', 'Success');
      FlowRouter.go('technologies.edit', { id: result });
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.technologiesAdd.onCreated(function() {
  this.name = new ReactiveVar('');
});

Template.technologiesAdd.helpers({
  technologiesCollection() {
    return Technologies;
  },
  tech() {
    return {
      name: Template.instance().name.get(),
      status: 'draft'
    };
  },
});

Template.technologiesAdd.events({
  'keyup input[name="name"]': function(event, template) {
    template.name.set(event.target.value);
  }
});
