Template.projectStatus.helpers({
  color() {
    return ColorMap.project.status[this.status] || ColorMap.project.status.default;
  }
});
