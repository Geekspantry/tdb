FS.File.prototype.cloudinaryId = function(store) {
  let key = this.copies && this.copies[store] && this.copies[store].key;
  return Meteor.settings.public.cloudinary.s3MappingFolder + '/' + key;
};
