Template.topNavbar.onRendered(function() {

  // FIXED TOP NAVBAR OPTION
  // Uncomment this if you want to have fixed top navbar
  // $('body').addClass('fixed-nav');
  // $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');

});

toggleMenu = function() {
  // Toggle special class
  $("body").toggleClass("mini-navbar");

  // Enable smoothly hide/show menu
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    $('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(
      function() {
        $('#side-menu').fadeIn(500);
      }, 100);
  } else if ($('body').hasClass('fixed-sidebar')) {
    $('#side-menu').hide();
    setTimeout(
      function() {
        $('#side-menu').fadeIn(500);
      }, 300);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    $('#side-menu').removeAttr('style');
  }
}
Template.topNavbar.events({

  // Toggle left navigation
  'click #navbar-minimalize': function(event) {

    event.preventDefault();
    toggleMenu();

  },
  "click #logout": function(e) {
    AccountsTemplates.logout();
  }

});

Template.topNavbar.helpers({
  env() {
    return Template.instance().env.get();
  }
});

Template.topNavbar.onCreated(function() {
  this.env = new ReactiveVar;
  Meteor.call('env', (error, env) => {
    console.log('ENV:', env);
    if (env === 'development') {
      this.env.set({
        name: env,
        color: 'default'
      });
    }

    if (env === 'staging') {
      this.env.set({
        name: env,
        color: 'warning'
      });
    }
  });
});
