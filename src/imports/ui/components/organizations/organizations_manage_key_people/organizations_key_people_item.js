import { Template } from 'meteor/templating';
import 'meteor/chrismbeckett:toastr';
import { removeKeyPeople } from '/imports/api/organizations/methods';
import './organizations_key_people_item.html';


Template.organizationsKeyPeopleItem.events({
  'click .delete-key-people': function() {
    removeKeyPeople.call({orgId: this.orgId, personId: this.people._id});
  },
  'click .google-search': function() {
  }
});
