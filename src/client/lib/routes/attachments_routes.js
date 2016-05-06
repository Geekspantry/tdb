let attachmentsRoutes = FlowRouter.group({
  prefix: '/attachments',
  name: 'attachments'
});

attachmentsRoutes.route('/', {
  name: 'attachments.dashboard',
  title: 'Attachments',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsDashboard',
      btnText: 'Create new Attachment',
      btnLink: 'attachments.add',
    });
  }
});

attachmentsRoutes.route('/add', {
  name: 'attachments.add',
  parent: 'attachments.dashboard',
  title: 'Add Attachment',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsAdd'
    });
  },
});

attachmentsRoutes.route('/:id/entry', {
  name: 'attachments.entry',
  parent: 'attachments.dashboard',
  title() {
    let attachment = Attachments.findOne({
      _id: FlowRouter.getParam('id')
    });
    return attachment && attachment.name;
  },
  subscriptions(params) {
    this.register('attachments.single', subs.subscribe('attachments.single', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsEntry'
    });
  },
});

attachmentsRoutes.route('/:id/edit', {
  name: 'attachments.edit',
  parent: 'attachments.entry',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'attachmentsEdit'
    });
  },
  subscriptions(params) {
    this.register('attachment', subs.subscribe('attachment', params.id));
  }
});
