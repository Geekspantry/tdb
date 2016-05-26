import { Template } from 'meteor/templating';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
import { FlowRouter} from 'meteor/kadira:flow-router';
import './organizations_technologies.html';

Template.orgTechnologies.events({
  'click #manage-org-technologies': function() {
    Modal.show('manageOrgTechnologies', {
      organizationId: FlowRouter.getParam('id')
    });
  }
});


