Meteor.publish('recentUpdatesCounter', function(selector) {
  Counts.publish(this, 'recentUpdatesCounter', Logs.find(selector));
});
