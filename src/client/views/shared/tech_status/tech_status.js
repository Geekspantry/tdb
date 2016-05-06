Template.techStatus.helpers({
  color() {
    return ColorMap.tech.status[this.status] || ColorMap.project.status.default;
  }
});
