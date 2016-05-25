Meteor.methods({
  /*
  uploadImagesFromUrls: function(urls){
    check(urls, [String])
    function uploadImages(urls, callback) {
      let images = [];
      urls.forEach((link) => {
        Meteor.call('uploadImageFromUrl', link, (error, fileId) => {
          images.push({
            src: fileId,
            description: 'No Description',
            showcased: false
          });
        });
      });
      // This guy don't wait the loop ends...
      callback(null, images);
    }

    let uploadImagesSync = Async.wrap(uploadImages);
    return uploadImagesSync;
  },
  */
  
  // Need to be on the server to avoid CORS.
  uploadImageFromUrl: function(url) {
    this.unblock();
    check(url, String);

    function upload(_url, callback) {
      console.info('Starting to download file from remote url:', _url);

      try {
        Images.insert(_url, function(error, fileObj) {
          if (error) return callback(error);

          return callback(null, fileObj._id);
        });
      } catch (e) {
        return callback(e);
      }
    }

    // Async to get file metadata.
    let uploadImageFromUrlSync = Async.wrap(upload);
    return uploadImageFromUrlSync(url);
  },
  // Need to be on the server to avoid CORS.
  uploadFileFromUrl: function(url) {
    check(url, String);

    function upload(_url, callback) {
      console.info('Starting to download file from remote url:', _url);

      // https://github.com/CollectionFS/Meteor-CollectionFS#storing-fsfile-references-in-your-objects
      // Cant get file reference from the server
      try {
        Files.insert(_url, function(error, fileObj) {
          if (error) return callback(error);

          return callback(null, fileObj._id);
        });
      } catch (e) {
        return callback(e);
      }
    }

    // Async to get file metadata.
    let uploadFileFromUrlSync = Async.wrap(upload);
    return uploadFileFromUrlSync(url);
  },
  attachData: function(url) {
    check(url, String);

    function attach(_url, callback) {
      let mockFile = new FS.File();
      mockFile.attachData(_url, function(err) {
        return callback(err);
      });
    }

    let attachAsync = Async.wrap(attach);
    return attachAsync(url);
  }
});
