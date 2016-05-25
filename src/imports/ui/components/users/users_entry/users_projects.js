import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import './users_projects.html';

Template.usersProjects.events({
  'click #manage-user-projects': function() {
    Modal.show('manageUserProjects', {
      userId: FlowRouter.getParam('id')
    });
  }
});


