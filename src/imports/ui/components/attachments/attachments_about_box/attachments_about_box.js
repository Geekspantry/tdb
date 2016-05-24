import { Template } from 'meteor/templating';
import './attachments_about_box.html';


Template.attachmentsAboutBox.helpers({
	deleteOptions() {
    let template = Template.instance();
    return {
    	class: 'btn btn-danger btn-block btn-outline btn-sm',
      _id: template.data._id,
      name: template.data.name,
      successCallback() {
        FlowRouter.go('attachments.dashboard');
      }
    };
	}
});
