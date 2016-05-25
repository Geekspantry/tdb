import MetaInspector from 'node-metainspector';

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


Meteor.methods({
  getMetadataFromUrl: function(url) {
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
