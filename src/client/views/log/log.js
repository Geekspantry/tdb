Template.log.helpers({
  orgSelector() {
    return {
      collection: 'organizations',
      createdAt: {$gt: new Date(2016, 0, 1)}
    };
  },
  userSelector() {
    return {
      userId: 'cqd2odEAQm6xhHkjQs'
    };
  },
  techSelector() {
    return {
      collection: 'technologies',
      createdAt: {$lt: new Date(2017, 0, 1)}
    }
  }
});
