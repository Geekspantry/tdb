'use strict';

var TDBRouter = {
  routes: [],
  rootElement: document.querySelector('#main'),
  getRouteByHash: function(hash){
    return this.routes.find(r => r.path === hash.substring(1));
  },
  addRoute: function({path, template, onRendered, context}) {
    return this.routes.push({path, template, onRendered, context});
  },
  render: function(hash) {
    var route = this.getRouteByHash(hash);
    if (route) {
      this.rootElement.innerHTML = TDB.templates[route.template](route.context);
      window.setTimeout(route.onRendered, 0);
    } else {
      this.rootElement.innerHTML = TDB.templates.notFound()
    }
  }
};

$(document).ready(function() {
  TDBRouter.render(window.location.hash);
});

$(window).bind("hashchange", function() {
  TDBRouter.render(window.location.hash);
});

