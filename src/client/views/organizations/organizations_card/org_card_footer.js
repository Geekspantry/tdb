Template.orgCardFooter.onCreated(function() {
  this.subscribe('organization-relations-counter', this.data._id);
});

Template.orgCardFooter.helpers({
  technologiesCount() {
    return Counts.get(`organization-technologies-${this._id}`);
  },
  projectsCount() {
    return Counts.get(`organization-projects-${this._id}`);
  },
  attachmentsCount() {
    return Counts.get(`organization-attachments-${this._id}`);
  },
  onClickView() {
    let id = this._id;
    return () => {
      FlowRouter.go('organizations.entry', {id: id});
    };
  }
});
