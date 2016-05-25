export const Files = new FS.Collection('files', {
  stores: [new FS.Store.S3('files')],
  filter: {
    allow: {
      contentTypes: Meteor.settings.public.allowContentTypes
    },
    onInvalid: function(message) {
      toastr.error(message);
    }
  }
});
