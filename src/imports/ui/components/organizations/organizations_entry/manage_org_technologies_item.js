import { Template } from 'meteor/templating';
import {addTechnology, removeTechnology} from '/imports/api/organizations/methods.js';
import { Technologies } from '/imports/api/technologies/technologies';

import './manage_org_technologies_item.html';

Template.manageOrgTechnologiesItem.helpers({
  inProject() {
    let organizationId = Template.instance().data.organizationId;
    let inProject = Technologies.findOne({
      organizationsId: organizationId,
      _id: this._id
    });

    return inProject;
  },
});

Template.manageOrgTechnologies.events({
  'click .add-technology': function(e, t) {
    addTechnology.call({orgId: t.data.organizationId, technologyId: this._id}, function(error) {
      if (error) {
        return toastr.error(error.toString(), 'Error');
      }
      return toastr.success('Technology linked with organization successfuly', 'Success');
    });
  },
  'click .remove-technology': function(e, t) {
    removeTechnology.call({orgId: t.data.organizationId, technologyId: this._id}, function(error) {
      if (error) {
        return toastr.error(error.toString(), 'Error');
      }
      return toastr.success('Technology linked with organization successfuly', 'Success');
    });
  }
});
