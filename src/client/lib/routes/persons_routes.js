let personsRoutes = FlowRouter.group({
  prefix: '/persons',
  name: 'Persons'
});

personsRoutes.route('/', {
  name: 'persons.index',
  title: 'Persons',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'persons'});
  }
});


personsRoutes.route('/add', {
  name: 'persons.add',
  parent: 'persons.index',
  title: 'Add',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'personsAdd'});
  },
});

personsRoutes.route('/:id/view', {
  name: 'persons.view',
  parent: 'persons.index',
  title() {
    let person = Persons.findOne({_id: FlowRouter.getParam('id')});
    return person && person.name;
  },
  subscriptions(params) {
    this.register('person', subs.subscribe('person', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {main: 'personsView'});
  },
});


personsRoutes.route('/:id/edit', {
  name: 'persons.edit',
  parent: 'persons.view',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {main: 'personsEdit'});
  },
  subscriptions(params) {
    this.register('person', subs.subscribe('person', params.id));
  }
});

