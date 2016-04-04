this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["attachmentsDashboard"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.attachmentCard,depth0,{"name":"attachmentCard","data":data,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"row border-bottom white-bg page-heading\">\n  <div class=\"col-lg-12\">\n    <ol class=\"breadcrumb\">\n      <li>\n        Attachments\n      </li>\n      <li class=\"active\">\n        <strong>Dashboard</strong>\n      </li>\n    </ol>\n  </div>\n</div>\n<div class=\"wrapper-content\">\n  <div class=\"row tooltip-demo\">\n    <div class=\"col-lg-3 col-sm-5\">\n      <div class=\"ibox\">\n        <div class=\"ibox-title\">\n          <h5>Attachments Overview</h5>\n        </div>\n        <div class=\"ibox-content dashboard-ibox\">\n          <p><a href=\"technologyAdd.php\" class=\"btn btn-block btn-primary\">Add a new attachment</a></p>\n          <table class=\"table\">\n            <tbody>\n              <tr>\n                <td>\n                  We have <strong>123</strong> Attachments on TDB\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <strong>80</strong> of them are <a href=\"\" class=\"label label-primary label-outline\">Articles</a>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <strong>20</strong> of them are <a href=\"\" class=\"label label-primary label-outline\">Media</a>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <strong>20</strong> of them are <a href=\"\" class=\"label label-primary label-outline\">News</a>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  <strong>20</strong> of them are <a href=\"\" class=\"label label-primary label-outline\">Whitepapers</a>\n                </td>\n              </tr>\n              <tr>\n                <td>\n                  The newest one is <a class=\"label label-outline\" href=\"#/attachments/attachmentEntry\"><i class=\"icon fa fa-paperclip\"></i> Skin Patch</a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-lg-9 col-sm-7\">\n"
    + ((stack1 = container.invokePartial(partials.latestUpdates,depth0,{"name":"latestUpdates","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n  </div>\n  <!-- fim -->\n  <div class=\"row tooltip-demo\">\n    <!-- About box -->\n    <div class=\"col-lg-12\">\n      <div class=\"ibox\">\n        <div class=\"ibox-title\">\n          <div class=\"search-source-display-mode\">\n            <div class=\"search-source\">\n              <div class=\"input-group\">\n                <span class=\"input-group-addon\">\n                    <i class=\"fa fa-search refresh\"></i>\n                  </span>\n                <input class=\"form-control\" placeholder=\"Search for something...\" name=\"search\" type=\"text\" id=\"search-text\">\n              </div>\n            </div>\n            <div class=\"display-mode\">\n              <button class=\"btn btn-default\" type=\"button\" id=\"toggle-list\">\n                <i class=\"fa fa-list\"></i>\n              </button>\n              <button class=\"btn btn-primary\" type=\"button\" id=\"toggle-grid\">\n                <i class=\"fa fa-th\"></i>\n              </button>\n            </div>\n          </div>\n        </div>\n        <div class=\"ibox-content\">\n          <div class=\"row cards-box\">\n            <div class=\"cards-size\"></div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.attachments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});;