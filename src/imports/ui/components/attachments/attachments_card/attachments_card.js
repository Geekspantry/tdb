import { Template } from 'meteor/templating';
import popups from '/imports/ui/components/common/popups/popups';
import { remove } from '/imports/api/attachments/methods';

import './attachments_card_tools';
import './attachments_card_footer';
import './attachments_card_desc';

import './attachments_card.html';

Template.attachmentsCard.onCreated(function() {
  this.state = new ReactiveVar();
});
Template.attachmentsCard.helpers({
  isDeleted() {
    return Template.instance().state.get() === 'deleted';
  },
  fetchOptions() {
    return {
      type: 'fetch'
    };
  },
  useBackground() {
    // Apply background if is not from web and not a file image.
    return this.from !== 'web' && (this.file && this.file.type.indexOf('image') !== 0);
  },
  isImage() {
    return this.file.type.indexOf('image') === 0;
  },
  deleteOptions() {
    let template = Template.instance();
    return {
      _id: template.data._id,
      name: TagStripper.strip(template.data.name),
      successCallback() {
        template.state.set('deleted');
      }
    };
  }
});
