FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('plainLayout', {
      main: 'errorPage',
      errorCode: 404
    });
  }
};

FlowRouter.route('/search', {
  name: 'search',
  title: 'Search',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'search'
    });
  },
});


