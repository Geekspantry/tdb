import { Colors } from '/imports/resources/resources';
import { Template } from 'meteor/templating';
import './project_status.html';

Template.projectStatus.helpers({
  color() {
    return Colors.project.status[this.status] || Colors.project.status.default;
  }
});
