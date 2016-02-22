Files = new FS.Collection('files', {
  stores: [new FS.Store.S3('files', {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_S3_REGION,
    folder: process.env.AWS_S3_FOLDER,
    ACL: 'public-read',
  })],
  filter: {
    allow: {
      contentTypes: Meteor.settings.public.allowContentTypes
    },
    onInvalid: function(message) {
    }
  }
});
