FlowRouter.route('/', {
  name: 'dashboard',
  title: 'Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'mainDashboard'
    });
  },
  triggersEnter: [function(context, redirect) {
    if (!Meteor.user()) {
      redirect('/signin');
    }
  }],
});

