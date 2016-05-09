import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import 'meteor/chrismbeckett:toastr';

import './collections_set_add.html';

AutoForm.hooks({
  insertCollectionsSetForm: {
    before: {
      method(doc) {
        doc.projectId = this.template.data.projectId;
        return doc;
      }
    },
    onSuccess() {
      toastr.success('Collection created successfully: ' + this.insertDoc.name, 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
      console.log(error);
    }
  }
});
