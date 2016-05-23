import { Logs } from '/imports/api/logs/logs';

const ALL_COLLECTIONS_CHAR = '*';
const COUNTER_PREFIX = 'recentUpdatesCounter-';

Meteor.publish('recentUpdates', function(selector, counterId, limit) {
  check(selector, Object);
  check(counterId, String);
  check(limit, Number);

  Counts.publish(this, COUNTER_PREFIX + counterId, Logs.find(selector));


  if (limit !== 0) {
    return Logs.find(selector, {
      limit: limit,
      sort: {
        createdAt: -1
      }
    });
  }
  this.ready();
});

