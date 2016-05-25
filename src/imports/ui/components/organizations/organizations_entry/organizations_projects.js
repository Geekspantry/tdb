import { Template } from 'meteor/templating';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
import { FlowRouter} from 'meteor/kadira:flow-router';
import './organizations_projects.html';

Template.orgProjects.events({
  'click #manage-org-projects': function() {
    Modal.show('manageOrgProjects', {
      organizationId: FlowRouter.getParam('id')
    });
  }
});


