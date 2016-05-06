Template.attachmentsCard.onCreated(function() {
  this.state = new ReactiveVar();
});
Template.attachmentsCard.helpers({
  isDeleted() {
    return Template.instance().state.get() === 'deleted';
  },
  fetchOptions() {
    return {
      type: 'fetch'
    };
  },
  useBackground() {
    // Apply background if is not from web and not a file image.
    return this.from !== 'web' && (this.file && this.file.type.indexOf('image') !== 0);
  },
  isImage() {
    return this.file.type.indexOf('image') === 0;
  }
});

Template.attachmentsCard.events({
  'click .delete': function(event, template) {
    event.preventDefault();

    removeConfirmation(TagStripper.strip(template.data.name), () => {
      Meteor.call('Attachments.methods.remove', template.data._id, (err, res) => {
        if (err) return removeError();
        removeSuccess();
        template.state.set('deleted');
      });
    });
  }
});

