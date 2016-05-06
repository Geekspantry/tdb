Template.projectsCardFooter.onCreated(function() {
  this.subscribe('project-relations-counter', this.data._id);
});

Template.projectsCardFooter.helpers({
  collectionsCount() {
    return Counts.get(`project-collections-${this._id}`);
  },
  technologiesStashCount() {
    return Counts.get(`project-technologies-stash-${this._id}`);
  },
  attachmentsCount() {
    return Counts.get(`project-attachments-${this._id}`);
  },
  onClickView() {
    let id = this._id;
    return () => {
      FlowRouter.go('projects.entry', {id: id});
    };
  }
});
