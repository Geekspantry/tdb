import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

import './users_entry.html';

Template.usersEntry.helpers({
  user: function() {
    let user = Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });

    return user;
  },
  userSelector() {
    return {
      userId: FlowRouter.getParam('id')
    };
  }
});

Template.usersEntry.onCreated(function() {
  this.autorun(() => {
    let userId = FlowRouter.getParam('id');
    this.subscribe('users.single', userId);
  });
});
