



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

}


// On the client just create a generic FS Store as don't have
// access (or want access) to S3 settings on client
if (Meteor.isClient) {

}

