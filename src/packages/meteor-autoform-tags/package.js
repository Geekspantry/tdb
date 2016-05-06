/**
 * Original package: https://github.com/yogiben/meteor-autoform-tags
 * Modified to use updated plugin versions.
 */

Package.describe({
  name: 'tdb:autoform-tags',
  summary: 'Tags input for aldeed:autoform',
  version: '0.2.0',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');

  api.use([
    'jquery',
    'templating',
    'coffeescript',
    'reactive-var',
    'aldeed:autoform@5.6.0',
  ], 'client');

  api.addFiles([
    'lib/client/lib/bootstrap-tagsinput/bootstrap-tagsinput.css',
    'lib/client/lib/bootstrap-tagsinput/bootstrap-tagsinput.js',
    'lib/client/autoform-tags.html',
    'lib/client/autoform-tags.css',
    'lib/client/autoform-tags.coffee'
  ], 'client');
});
