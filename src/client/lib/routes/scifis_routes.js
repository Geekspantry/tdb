let scifisRoutes = FlowRouter.group({
  prefix: '/scifis',
  name: 'Scifis'
});

scifisRoutes.route('/', {
  name: 'scifis.index',
  title: 'Scifis',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'scifis'});
  }
});


scifisRoutes.route('/add', {
  name: 'scifis.add',
  parent: 'scifis.index',
  title: 'Add',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'scifisAdd'});
  },
});

scifisRoutes.route('/:id/view', {
  name: 'scifis.view',
  parent: 'scifis.index',
  title() {
    let scifi = SciFis.findOne({_id: FlowRouter.getParam('id')});
    return scifi && scifi.name;
  },
  subscriptions(params) {
    this.register('scifi', subs.subscribe('scifi', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'scifisView'});
  },
});


scifisRoutes.route('/:id/edit', {
  name: 'scifis.edit',
  parent: 'scifis.view',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'scifisEdit'});
  },
  subscriptions(params) {
    this.register('scifi', subs.subscribe('scifi', params.id));
  }
});

