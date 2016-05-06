Template.usersDashboard.helpers({
  userRecentUpdatesSelector() {
    return {
      collection: 'users'
    };
  },
  getLink() {
    return FlowRouter.path('users.entry', {
      id: this._id
    });
  },
});
