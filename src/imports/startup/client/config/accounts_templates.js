import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Match } from 'meteor/check';

AccountsTemplates.configure({
  focusFirstInput: true,
  showPlaceholders: true,
  showValidating: true,
  texts: {
    button: {
      enrollAccount: "Sign up",
    },
  },
});

AccountsTemplates.addFields([{
  _id: 'firstName',
  type: 'text',
  required: true,
  displayName: 'First Name',
  placeholder: 'First Name',
  displayGroup: 'Personal Info'
}, {
  _id: 'lastName',
  type: 'text',
  required: true,
  displayName: 'Last Name',
  placeholder: 'Last Name',
  displayGroup: 'Personal Info'
}, {
  _id: 'birthday',
  type: 'text',
  required: true,
  displayName: 'Birthday',
  template: 'birthdayInput',
  displayGroup: 'Personal Info'
}, {
  _id: 'country',
  type: 'select',
  required: true,
  displayName: 'Country',
  template: 'countryInput',
  displayGroup: 'Personal Info'
}, {
  _id: 'city',
  type: 'text',
  required: true,
  displayName: 'City',
  displayGroup: 'Personal Info'
}, {
  _id: 'slack',
  type: 'text',
  displayName: 'Slack Username',
  placeholder: 'Slack Username (Optional)',
  displayGroup: 'Social'
}, {
  _id: 'twitter',
  type: 'text',
  displayName: 'Twitter URL',
  placeholder: 'Twitter URL (Optional)',
  displayGroup: 'Social'
}, {
  _id: 'personal',
  type: 'text',
  displayName: 'Personal URL',
  placeholder: 'Personal URL (Optional)',
  displayGroup: 'Social'
}]);
