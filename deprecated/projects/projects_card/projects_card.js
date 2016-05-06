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

    removeConfirmation(TagStripper.strip(template.data.name), () => {
      Meteor.call('Projects.methods.remove', template.data._id, (err, res) => {
        if (err) return removeError();
        removeSuccess();
        template.state.set('deleted');
      });
    });
  }
});
