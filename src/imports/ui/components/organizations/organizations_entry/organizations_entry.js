import { Template } from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import { Organizations } from '/imports/api/organizations/organizations';
import './organizations_entry.html';

Template.organizationsEntry.helpers({
  org: function() {
    let org = Organizations.findOne({
      _id: FlowRouter.getParam('id')
    });
    return org;
  },
});


Template.organizationsEntry.onCreated(function() {
  this.autorun(() => {
    let orgId = FlowRouter.getParam('id');
    this.subscribe('organizations.single', orgId);
  });
});
