AutoForm.hooks({
  insertAttachmentFromWebForm: {
    formToDoc(doc) {
      doc.from = 'web';
      return doc;
    },
    onSuccess() {
      return onAddAttachmentSuccess(this.insertDoc);
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});


Template.attachmentsAddFromWebsite.events({
  'input input[name="web.thumbnailUrl"]': function(e, t) {
    let attachment = t.attachment.get();
    attachment.web.thumbnailUrl = e.target.value;
    t.attachment.set(attachment);
  },
});

Template.attachmentsAddFromWebsite.helpers({
  attachmentFromWeb() {
    return Template.instance().attachment.get();
  },
  onFetchMetadataSuccess() {
    let template = Template.instance();
    return function(res) {
      template.attachment.set({
        name: res.title,
        description: res.description,
        web: {
          sourceUrl: res.url,
          thumbnailUrl: res.image,
        }
      });
    };
  }
});

Template.attachmentsAddFromWebsite.onCreated(function() {
  this.attachment = new ReactiveVar({
    web: {}
  });
});
