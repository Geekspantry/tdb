

FS.File.prototype.cloudinaryId = function(store) {
  let key = this.copies && this.copies[store] && this.copies[store].key;
  return Meteor.settings.public.cloudinary.s3MappingFolder + '/' + key;
};

/*
FS.File.prototype.S3Url = function(storeName) {
  let store = this.getCollection().storesLookup[storeName];
  let urlHost = 'https://s3.amazonaws.com';
  if (this.copies && this.copies[storeName]) {
    // TODO: Fix hardcoded amazon url
    let bucket = 'envisioning';
    let folder = 'tdb';
    let key = this.copies[storeName].key;

    console.log([store.bucket, store.folder, this.copies[storeName].key].join('/'));

    return `${urlHost}/${bucket}/${folder}/${key}`;

  }
};
*/

if (Meteor.isServer) {
  let imageStore = new FS.Store.S3('images', {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_S3_REGION,
    folder: process.env.AWS_S3_FOLDER,
    ACL: 'public-read',
    fileKeyMaker(fileObj) {
      let store = fileObj && fileObj._getInfo('images');
      if (store && store.key) return store.key;
      return fileObj.collectionName + '/' + fileObj._id;
    }
  });
  Images = new FS.Collection('images', {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    }
  });
}


// On the client just create a generic FS Store as don't have
// access (or want access) to S3 settings on client
if (Meteor.isClient) {
  let imageStore = new FS.Store.S3('images');
  Images = new FS.Collection('images', {
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
}

// Allow rules
Images.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  download: function() {
    return true;
  }
});
