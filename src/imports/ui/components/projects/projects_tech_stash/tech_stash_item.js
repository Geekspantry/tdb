import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import popups from '../../common/popups/popups';

import { Technologies } from '../../../../api/technologies/technologies';
import { pullTechnologiesStash } from '../../../../api/projects/methods.js';
import './tech_stash_item.html';


Template.techStashItem.helpers({
  getUser() {
    return Meteor.users.findOne({
      _id: this.addedBy
    });
  },
  getTechnology() {
    return Technologies.findOne({
      _id: this.technologyId
    });
  }
});


Template.techStashItem.events({
  'click .remove-tech': function(event, template) {
    let pData = Template.instance().parent().data;
    let projectId = pData.projectId;
    let techId = this._id;
    popups.removeConfirmation(this.name, () => {
      pullTechnologiesStash.call({projectId, techId}, (err, res) => {
        if (err) return popups.removeError(err.toString(), 'Error');
        popups.removeSuccess();
      });
    });
  }
});
