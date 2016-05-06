Template.techCardFooter.onCreated(function() {
  this.subscribe('technology-relations-counter', this.data._id);
});

Template.techCardFooter.helpers({
  attachmentsCount() {
    return Counts.get(`technology-attachments-${this._id}`);
  },
  projectsCount() {
    return Counts.get(`technology-projects-${this._id}`);
  },
  organizationsCount() {
    return Counts.get(`technology-organizations-${this._id}`);
  },
  onClickView() {
    let id = this._id;
    return () => {
      FlowRouter.go('technologies.entry', {id: id});
    };
  }
});
