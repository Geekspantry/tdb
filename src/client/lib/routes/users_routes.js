let usersRoutes = FlowRouter.group({
  prefix: '/users',
});

usersRoutes.route('/', {
  name: 'users.dashboard',
  title: 'Users',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersDashboard',
      btnLink: 'users.invite',
      btnText: 'Invite new User',
    });
  },
});

usersRoutes.route('/invite', {
  name: 'users.invite',
  parent: 'users.dashboard',
  title: 'Invite User',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersInvite'
    });
  },
});

usersRoutes.route('/:id/entry', {
  name: 'users.entry',
  parent: 'users.dashboard',
  title() {
    let user = Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });
    return user && user.identification();
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersEntry'
    });
  }
});

usersRoutes.route('/:id/edit', {
  name: 'users.edit',
  parent: 'users.entry',
  title: 'Editar',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'usersEdit'
    });
  },
  subscriptions(params) {
    this.register('user', subs.subscribe('user', params.id));
  }
});
