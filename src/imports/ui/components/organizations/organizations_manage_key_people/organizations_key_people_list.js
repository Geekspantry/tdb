import { Template } from 'meteor/templating';
import { Organizations } from '/imports/api/organizations/organizations';

import './organizations_key_people_list.html';

Template.organizationsKeyPeopleList.onCreated(function() {
  this.subscribe('organizations.keyPeople', this.data.orgId);
});

Template.organizationsKeyPeopleList.helpers({
  org() {
    return Organizations.findOne({
      _id: Template.instance().data.orgId
    });
  }
});
