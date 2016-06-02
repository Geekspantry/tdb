import { Template } from 'meteor/templating';
import {pushTechnologiesStash, pullTechnologiesStash} from '/imports/api/projects/methods.js';
import { Projects } from '/imports/api/projects/projects';

import './manage_tech_projects_item.html';

Template.manageTechProjectsItem.helpers({
  inProject() {
    let techId = Template.instance().data.techId;
    let inProject = Projects.findOne({
      _id: this._id,
      'technologiesStash.technologyId': techId
    });

    return inProject;
  },
});

Template.manageTechProjectsItem.events({
  'click .add-project': function(e, t) {
    pushTechnologiesStash.call({techId: t.data.techId, projectId: this._id}, function(error) {
      if (error) {
        return toastr.error(error.toString(), 'Error');
      }
      return toastr.success('Technology added to the project\'s stash', 'Success');
    });
  },
  'click .remove-project': function(e, t) {
    pullTechnologiesStash.call({techId: t.data.techId, projectId: this._id}, function(error) {
      if (error) {
       return toastr.error('Error', error.toString());
      }
      return toastr.success('Technology removed from the project\'s stash', 'Success');
    });
  }
});
