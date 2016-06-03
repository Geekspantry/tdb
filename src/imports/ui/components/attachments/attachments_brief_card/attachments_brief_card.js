Template.attachmentsBriefCard.helpers({
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
  onDelete() {
    let identification = this.name;
    let _id = this._id;
    return function(data, t) {
      removeConfirmation(identification, () => {
        Meteor.call('Attachments.methods.remove', _id, (err, res) => {
          if (err) {
            return removeError();
          }
          removeSuccess();
          t.state.set('deleted');
        });
      });
    };
  },
  onEdit() {
    identification = this.name;
    return function(data, t) {
      Modal.show('attachmentsEdit', {
        attachmentId: data._id,
        onSuccess() {
          t.state.set('updated');
        }
      });
    };
  }
});
