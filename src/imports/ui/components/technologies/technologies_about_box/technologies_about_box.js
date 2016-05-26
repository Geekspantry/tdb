import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { remove } from '/imports/api/technologies/methods';
import './technologies_about_box.html';
Template.technologiesAboutBox.helpers({
  deleteOptions() {
    let template = Template.instance();
    return {
      class: 'btn btn-danger btn-block btn-outline btn-sm',
      _id: template.data._id,
      method: remove,
      name: template.data.name,
      successCallback() {
        FlowRouter.go('technologies.dashboard');
      }
    };
  }
});

