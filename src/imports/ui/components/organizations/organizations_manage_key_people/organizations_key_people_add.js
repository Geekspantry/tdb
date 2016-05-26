import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import 'meteor/chrismbeckett:toastr';
import { addKeyPeople } from '/imports/api/organizations/methods';
import './organizations_key_people_add.html';
import { KeyPeopleSchema } from '/imports/api/organizations/schema';

AutoForm.hooks({
  insertKeyPeopleForm: {
    onSubmit(insertDoc, updateDoc, currentDoc) {
      addKeyPeople.call({ orgId: this.template.data.orgId, personDoc: insertDoc }, (err, res) => {
        if (err) {
          let error = new Error(err.reason);
          this.done(err);
          return;
        }
        this.done();
      });
      return false;
    },
    onSuccess() {
      toastr.success('Key People created successfully: ' + this.insertDoc.name, 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.organizationsKeyPeopleAdd.helpers({
  keyPeopleSchema: () => KeyPeopleSchema
});
