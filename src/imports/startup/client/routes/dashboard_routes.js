import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


FlowRouter.route('/', {
  name: 'dashboard',
  title: 'Dashboard',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'mainDashboard'
    });
  }
});

