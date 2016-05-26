import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Organizations } from '/imports/api/organizations/organizations';

let organizationsRoutes = FlowRouter.group({
  prefix: '/organizations',
  name: 'Organizations'
});

organizationsRoutes.route('/', {
  name: 'organizations.dashboard',
  title: 'Organizations',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsDashboard',
      btnText: 'Create new Organization',
      btnLink: 'organizations.add'
    });
  }
});


organizationsRoutes.route('/add', {
  name: 'organizations.add',
  parent: 'organizations.dashboard',
  title: 'New Organization',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsAdd'
    });
  },
});

organizationsRoutes.route('/:id/entry', {
  name: 'organizations.entry',
  parent: 'organizations.dashboard',
  title() {
    let organization = Organizations.findOne({
      _id: FlowRouter.getParam('id')
    });
    return organization && organization.name;
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsEntry'
    });
  },
});


organizationsRoutes.route('/:id/edit', {
  name: 'organizations.edit',
  parent: 'organizations.dashboard',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'organizationsEdit'
    });
  },
});
