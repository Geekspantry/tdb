Template.topNavigation.events({
  'click #logout': () => {
    AccountsTemplates.logout();
  }
});
Template.topNavigation.helpers({
	getUsersDashboardClass() {
		return FlowRouter.getRouteName() === 'users.dashboard' ? 'active' : '';
	},
	getCurrentUserClass() {
		return FlowRouter.getRouteName() === 'users.entry' &&
			FlowRouter.getParam('id') === Meteor.userId() ? 'active' : '';
	}
});

