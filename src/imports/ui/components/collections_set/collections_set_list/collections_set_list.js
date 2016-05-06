import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

import './collections_set_item';
import './collections_set_list.html';

Template.collectionsSetList.events({
  'click .add-collection-set': function(event, template) {
    Modal.show('collectionsSetAdd', {
      projectId: template.data._id
    });
  }
});
