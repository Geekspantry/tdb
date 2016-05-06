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


// Custom email
Accounts.emailTemplates.siteName = "tdb.envisioning.io";
Accounts.emailTemplates.from = "Envisioning <hello@envisioning.io>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "[TDB] Complete your registration "
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "You have been selected to participate in building a better future!"
     + " To activate your account, simply click the link below:\n\n"
     + url;
};