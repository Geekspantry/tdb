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

export const Images = new FS.Collection('images', {
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

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

