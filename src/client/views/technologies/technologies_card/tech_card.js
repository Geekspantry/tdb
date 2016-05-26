import popups from '/imports/ui/components/common/popups/popups';
import { remove } from '/imports/api/technologies/methods';

Template.techCard.onCreated(function() {
  this.state = new ReactiveVar();
});
Template.techCard.helpers({
  isDeleted() {
    return Template.instance().state.get() === 'deleted';
  },
  deleteOptions() {
    let template = Template.instance();
    return {
      _id: template.data._id,
      method: remove,
      name: TagStripper.strip(template.data.name),
      successCallback() {
        template.state.set('deleted');
      }
    };
  }
});