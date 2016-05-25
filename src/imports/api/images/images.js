let imageStore = new FS.Store.S3('images');
export const Images = new FS.Collection('images', {
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*']
    },
    onInvalid: function(message) {
      toastr.error(message);
    }
  }
});
