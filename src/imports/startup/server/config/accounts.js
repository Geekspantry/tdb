import { Accounts } from 'meteor/accounts-base'
import {SSR } from 'meteor/meteorhacks:ssr'

Accounts.urls.enrollAccount = function(token) {
  return Meteor.absoluteUrl('enroll-account/' + token);
};

Accounts.urls.resetPassword = function(token) {
  return Meteor.absoluteUrl('reset-password/' + token);
};

Accounts.onCreateUser(function(options, user) {
  if (options.info) {
    user.info = options.info;
  }
  user.profile = options.profile || {};
  return user;
});


/**
 * Email headers setup
 */
Accounts.emailTemplates.siteName = 'tdb.envisioning.io';
Accounts.emailTemplates.from = 'Envisioning <tdb@envisioning.io>';

/**
 * Email templates setup
 */
SSR.compileTemplate('enrollAccountEmail', Assets.getText('email_templates/enroll_account_email.html'));
Accounts.emailTemplates.enrollAccount.subject = (user) => 'Welcome to TDB';
Accounts.emailTemplates.enrollAccount.html = function(user, url) {
  return SSR.render('enrollAccountEmail', {
    user: user,
    enrollUrl: url
  });
};
