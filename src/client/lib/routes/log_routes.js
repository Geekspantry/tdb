let logRoutes = FlowRouter.group({
  prefix: '/log',
  name: 'Log'
});

logRoutes.route('/', {
  name: 'log',
  title: 'Log',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'log'});
  }
});