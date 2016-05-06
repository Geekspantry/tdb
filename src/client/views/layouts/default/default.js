Template.defaultLayout.onCreated(function() {
  this.subscribe('users.extraData');
});

Template.defaultLayout.onRendered(function() {
  // SKIN OPTIONS
  // Uncomment this if you want to have different skin option:
  // Available skin: (skin-1 or skin-3, skin-2 deprecated)
  // $('body').addClass('skin-1');

  // FIXED-SIDEBAR
  // Uncomment this if you want to have fixed left navigation
  // $('body').addClass('fixed-sidebar');
  // $('.sidebar-collapse').slimScroll({
  //     height: '100%',
  //     railOpacity: 0.9
  // });

  // BOXED LAYOUT
  // Uncomment this if you want to have boxed layout
  // $('body').addClass('boxed-layout');
});

Template.defaultLayout.helpers({
  title: function() {
    return FlowRouter.current().route.options.title;
  }
});

Template.loadedContent.onRendered(function() {
  // Minimalize menu when screen is less than 768px

  function fixLayout() {
    if (!$('body').hasClass('body-small')) {
      //  $('#page-wrapper').height($(window).height());
      let navbarHeigh = $('nav.navbar-default').height();
      let wrapperHeigh = $('#page-wrapper').height();

      if (navbarHeigh > wrapperHeigh) {
        $('#page-wrapper').css('min-height', navbarHeigh + 'px');
      }

      if (navbarHeigh < wrapperHeigh) {
        $('#page-wrapper').css('min-height', $(window).height() + 'px');
      }

      if ($('body').hasClass('fixed-nav')) {
        $('#page-wrapper').css('min-height', $(window).height() - 60 + 'px');
      }
    }
  }

  // Fix height of layout when resize, scroll and load
  $(window).bind('load resize scroll', function() {
    fixLayout();
  });

  function fixBody() {
    if ($(this).width() < 769) {
      $('body').addClass('body-small');
    } else {
      $('body').removeClass('body-small');
    }
  }

  $(window).bind('resize', function() {
    fixBody();
  });

  fixLayout();
  fixBody();
});
