import MetaInspector from 'node-metainspector';
import { ValidatedMethod } from 'meteor/mdg:validated-method';


function fetch(remoteUrl, callback) {
  let client = new MetaInspector(remoteUrl, {
    timeout: 5000
  });
  client.on('fetch', function() {
    callback(null, {
      title: client.title,
      description: client.description,
      image: client.image,
      url: client.url,
    });
  });

  client.on('error', function(err) {
    callback(err);
  });

  client.fetch();
}


export const getMetadataFromUrl = new ValidatedMethod({
  name: 'metadata.getMetadataFromUrl',
  validate({ url }) {
    check(url, String);
  },
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'metadata.getMetadataFromUrl.notLoggedIn',
  },
  run({ url }) {
    if (!this.isSimulation) {
      check(url, String);
      try {
        let syncFetch = Async.wrap(fetch);
        return syncFetch(url);
      } catch (e) {
        console.log(e);
        throw new Meteor.Error(e.code);
      }
    }
    return true;
  }
});
