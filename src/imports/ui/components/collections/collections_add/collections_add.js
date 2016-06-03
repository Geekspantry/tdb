import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import 'meteor/chrismbeckett:toastr';
import { Collections } from '/imports/api/collections/collections';
import './collections_add.html';


AutoForm.hooks({
  insertCollectionsForm: {
    before: {
      method(doc) {
        let data = this.template.data;

        if (data.parentId) {
          doc.parentId = data.parentId;
        }

        doc.collectionsSetId = data.collectionsSetId;
        doc.projectId = data.projectId;

        return doc;
      }
    },
    onSuccess() {
      toastr.success('Collection created successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.collectionsAdd.helpers({
  collectionsCollection() {
    return Collections;
  }
});
