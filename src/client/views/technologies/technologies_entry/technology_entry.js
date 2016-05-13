import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Technologies } from '../../../../imports/api/technologies/technologies';

Template.technologiesEntry.onCreated(function() {
  this.subscribe('technologies.single', FlowRouter.getParam('id'), {
  	organizations: true,
  	projects: true,
  	attachments: true
  });
});

Template.technologiesEntry.helpers({
  tech: () => Technologies.findOne(FlowRouter.getParam('id')),
});
