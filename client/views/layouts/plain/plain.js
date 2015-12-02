Template.plainLayout.onRendered(function() {
    // Add gray color for background in blank layout
    $('body').addClass('gray-bg');
});

Template.plainLayout.onDestroyed(function() {
    // Remove special color for blank layout
    $('body').removeClass('gray-bg');
});
