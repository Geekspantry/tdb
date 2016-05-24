import { Template } from 'meteor/templating';
import {addProject, removeProject} from '/imports/api/organizations/methods.js';
import { Projects } from '/imports/api/projects/projects';

import './manage_org_projects_item.html';

Template.manageOrgProjectsItem.helpers({
  inProject() {
    let organizationId = Template.instance().data.organizationId;
    let inProject = Projects.findOne({
      _id: this._id,
      organizationsId: organizationId
    });

    return inProject;
  },
});

Template.manageOrgProjectsItem.events({
  'click .add-project': function(e, t) {
    addProject.call({orgId: t.data.organizationId, projectId: this._id}, function(error) {
      if (error) {
        return toastr.error(error.toString(), 'Error');
      }
      return toastr.success('Project linked with organization successfuly', 'Success');
    });
  },
  'click .remove-project': function(e, t) {
    removeProject.call({orgId: t.data.organizationId, projectId: this._id}, function(error) {
      if (error) {
       return toastr.error('Error', error.toString());
      }
      return toastr.success('Project unlinked with organization successfuly', 'Success');
    });
  }
});
