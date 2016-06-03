Package.describe({
  name: 'newnectar:meteor-autoform-select-country-flags',
  version: '0.0.1',
  summary: 'Autoform country select flags',
  git: 'https://github.com/NewNectarMedia/meteor-autoform-select-country-flags',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['templating'], 'client')
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.use('jss:flag-icon@0.7.3');
  api.use('chhib:selectize-bootstrap-3@0.0.1');
  api.use('jeremy:selectize@0.12.1');

  api.addFiles(['countries.js',
                'country-flags-select.html',
                'country-flags-select.js'],
                'client');
});
