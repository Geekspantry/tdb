AutoForm.hooks({
  insertKeyPeopleForm: {
    onSubmit(insertDoc, updateDoc, currentDoc) {
      Meteor.call('Organizations.methods.addKeyPeople', this.template.data.orgId, insertDoc);
      this.done();
      return false;
    },
    onSuccess() {
        toastr.success('Key People created successfully: ' + this.insertDoc.name, 'Success');
      },
      onError(formType, error) {
        toastr.error(error.toString(), 'Error');
      },
  }
});
