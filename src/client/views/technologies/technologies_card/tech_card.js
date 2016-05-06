


Template.techCard.onCreated(function() {
  this.state = new ReactiveVar();
});
Template.techCard.helpers({
  isDeleted() {
    return Template.instance().state.get() === 'deleted';
  }
});

Template.techCard.events({
  'click .delete': function(event, template) {
    event.preventDefault();

    removeConfirmation(TagStripper.strip(template.data.name), () => {
      Meteor.call('Technologies.methods.remove', template.data._id, (err, res) => {
        if (err) return removeError();
        removeSuccess();
        template.state.set('deleted');
      });
    });
  }
});
