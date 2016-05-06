// Modified UserAccounts to our needs.
// https://github.com/meteor-useraccounts/core/blob/master/lib/templates_helpers/at_pwd_form.js

Template.enrollAccount.helpers({
  disabled() {
    return AccountsTemplates.disabled();
  },
  fields() {
    return _.filter(AccountsTemplates.getFields(), function(s) {
      return s._id !== 'email';
    });
  },
  showForgotPasswordLink() {
    return false;
  },
  showReCaptcha() {
    return false;
  },
  showError() {
    return !!AccountsTemplates.state.form.get('error');
  },
  email() {
    let user = Meteor.users.findOne({
      'services.password.reset.token': AccountsTemplates.getparamToken()
    });
    return user && user.emails[0].address;
  },
});

Template.enrollAccount.onCreated(function() {
  this.subscribe('user.enrollAccount', AccountsTemplates.getparamToken());
});

Template.enrollAccount.events({
  'submit .enroll-form': function(event, t) {
    event.preventDefault();
    t.$('#at-btn').blur();

    AccountsTemplates.setDisabled(true);

    let parentData = Template.currentData();
    let state = parentData && parentData.state || AccountsTemplates.getState();
    let preValidation = state !== 'signIn';

    // Client-side pre-validation
    // Validates fields values
    // NOTE: This is the only place where password validation can be enforced!
    let formData = {};
    let someError = false;
    let errList = [];
    _.each(AccountsTemplates.getFields(), function(field) {
      // > Modified to skip email address.
      if (field._id === 'email') {
        return;
      }

      let fieldId = field._id;
      let rawValue = field.getValue(t);
      let value = field.fixValue(rawValue);
      // Possibly updates the input value
      if (value !== rawValue) {
        field.setValue(t, value);
      }
      if (value !== undefined && value !== '') {
        formData[fieldId] = value;
      }

      // Validates the field value only if current state is not 'signIn'
      if (preValidation && field.getStatus() !== false) {
        let validationErr = field.validate(value, 'strict');
        if (validationErr) {
          if (field.negativeValidation) {
            field.setError(validationErr);
          } else {
            let fId = T9n.get(field.getDisplayName(), markIfMissing = false);
            errList.push({
              field: field.getDisplayName(),
              err: validationErr
            });
          }
          someError = true;
        } else {
          field.setSuccess();
        }
      }
    });

    // Clears error and result
    AccountsTemplates.clearError();
    AccountsTemplates.clearResult();
    AccountsTemplates.clearMessage();
    // Possibly sets errors
    if (someError) {
      if (errList.length) {
        AccountsTemplates.state.form.set("error", errList);
      }
      AccountsTemplates.setDisabled(false);
      // reset reCaptcha form
      if (state === 'signUp' && AccountsTemplates.options.showReCaptcha) {
        grecaptcha.reset();
      }
      return;
    }

    // Extracts username, email, and pwds
    let current_password = formData.current_password;
    let email = formData.email;
    let password = formData.password;
    let password_again = formData.password_again;
    let username = formData.username;
    let username_and_email = formData.username_and_email;
    let firstName = formData.firstName;
    let lastName = formData.lastName;
    // Clears profile data removing username, email, and pwd
    delete formData.current_password;
    delete formData.email;
    delete formData.password;
    delete formData.password_again;
    delete formData.username;
    delete formData.username_and_email;
    delete formData.firstName;
    delete formData.lastName;

    if (AccountsTemplates.options.confirmPassword) {
      // Checks passwords for correct match
      if (password_again && password !== password_again) {
        var pwd_again = AccountsTemplates.getField("password_again");
        if (pwd_again.negativeValidation)
          pwd_again.setError(AccountsTemplates.texts.errors.pwdMismatch);
        else
          AccountsTemplates.state.form.set("error", [{
            field: pwd_again.getDisplayName(),
            err: AccountsTemplates.texts.errors.pwdMismatch
          }]);
        AccountsTemplates.setDisabled(false);
        //reset reCaptcha form
        if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {
          grecaptcha.reset();
        }
        return;
      }
    }

    let paramToken = AccountsTemplates.getparamToken();
    let user = Meteor.users.findOne({ 'services.password.reset.token': paramToken });

    t.subscribe('singleUser', user._id);
    Accounts.resetPassword(AccountsTemplates.getparamToken(), password, function(error) {
      if (error) return toastr.error(error.toString());

      Meteor.users.update({
        _id: user._id
      }, {
        $set: {
          'profile.firstName': firstName,
          'profile.lastName': lastName
        }
      });

      return FlowRouter.go('search');
    });
  }
});
