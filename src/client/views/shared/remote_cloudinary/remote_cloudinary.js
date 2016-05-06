Template.remoteCloudinary.helpers({
  url() {
    return $.cloudinary.url('s3/' + Template.instance().data.remoteUrl, Template.instance().data.options);
  }
});

Template.remoteCloudinary.onCreated(function() {
  this.data.remoteUrl = this.data.remoteUrl || '';
  this.data.options = this.data.options || {};
});

