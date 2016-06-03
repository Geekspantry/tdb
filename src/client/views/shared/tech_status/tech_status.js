import { Colors } from '/imports/resources/resources';

Template.techStatus.helpers({
  color() {
    return Colors.tech.status[this.status] || Colors.project.status.default;
  }
});
