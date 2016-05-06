Template.projectsAboutBox.helpers({
  techReviewCount() {
    return Counts.get('project-tech-stash-review');
  }
});

Template.projectsAboutBox.onCreated(function() {
  this.subscribe('project-tech-stash', Template.instance().data._id);
});
