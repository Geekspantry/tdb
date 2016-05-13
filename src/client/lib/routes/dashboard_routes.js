FlowRouter.route('/', {
  name: 'dashboard',
  title: 'Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'mainDashboard'
    });
  }
});

