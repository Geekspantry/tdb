import { Template } from 'meteor/templating';
import './birthday_input.html';

Template.birthdayInput.onRendered(function() {
  this.$('input').datepicker();
});;
