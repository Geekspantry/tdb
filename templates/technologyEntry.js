this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["technologyEntry"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.organizationCard,depth0,{"name":"organizationCard","data":data,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.projectCard,depth0,{"name":"projectCard","data":data,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.attachmentCard,depth0,{"name":"attachmentCard","data":data,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"row border-bottom white-bg page-heading\">\n  <div class=\"col-lg-12\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"#/technologies\">Technologies</a>\n      </li>\n      <li class=\"active\">\n        <strong>Drone Delivery</strong>\n      </li>\n    </ol>\n  </div>\n</div>\n<div class=\"wrapper-content\">\n  <div class=\"row tooltip-demo\">\n    <div class=\"col-lg-3\">\n"
    + ((stack1 = container.invokePartial(partials.technologyCard_add,depth0,{"name":"technologyCard_add","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "      <table class=\"table small\">\n        <tr>\n          <td>\n            <strong>Created</strong>\n          </td>\n          <td>\n            Dec 13, 2013\n          </td>\n        </tr>\n        <tr>\n          <td>\n            <strong>Last updated</strong>\n          </td>\n          <td>\n            Dec 13, 2015\n          </td>\n        </tr>\n        <tr>\n          <td><strong>Tags</strong></td>\n          <td>\n            <span class=\"tag label label-primary\">Drone</span>\n            <span class=\"tag label label-primary\">UAV</span>\n            <span class=\"tag label label-primary\">Air</span>\n            <span class=\"tag label label-primary\">Automation</span>\n            <span class=\"tag label label-primary\">Artificial Intelligence</span>\n        </tr>\n        <tr>\n          <td><strong>Status</strong></td>\n          <td><span class=\"label label-primary\">Published</span></td>\n        </tr>\n      </table>\n      <a href=\"#/technologies/edit\" class=\"btn btn-primary btn-block btn-outline btn-sm\">Edit</a>\n    </div>\n    <div class=\"col-lg-9\">\n      <div class=\"row\">\n        <div class=\"col-sm-7\">\n          <div class=\"ibox\">\n            <div class=\"ibox-title\">\n              <h1>Description</h1>\n            </div>\n            <div class=\"ibox-content\" style=\"height:284px;\">\n              <p>Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage.</p>\n              <p>This description can be a lot longer and rich in text</p>\n              <ul>\n                <li>We can have bullet lists</li>\n                <li>Other things</li>\n              </ul>\n              <p>and nice formating</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-5\">\n          <div class=\"ibox\">\n            <div class=\"ibox-content\" style=\"max-height:340px; overflow-y: scroll;\">\n              <ul class=\"thumbnails\">\n                <li><img src=\"http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg\" class=\"img-responsive img-thumbnail\" />\n                  <p style=\"text-align:center;\">This is the Description</p>\n                </li>\n                <li><img src=\"http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg\" class=\"img-responsive img-thumbnail\" />\n                  <p style=\"text-align:center;\">This is the Description</p>\n                </li>\n                <li><img src=\"http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg\" class=\"img-responsive img-thumbnail\" />\n                  <p style=\"text-align:center;\">This is the Description</p>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"ibox float-e-margins\">\n        <div class=\"ibox-title\">\n          <h1>\n                            <i class=\"fa fa-paperclip\"></i>\n                            Organizations\n                            </h1>\n          <div class=\"ibox-tools\">\n            <a href=\"#\" id=\"manage-org-attachments\">\n              <i class=\"fa fa-plus\"></i>\n            </a>\n          </div>\n        </div>\n        <div class=\"ibox-content\">\n          <div class=\"row cards-box cards-responsive\">\n            <div class=\"cards-size\"></div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.organizations : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\n        </div>\n      </div>\n      <div class=\"ibox float-e-margins\">\n        <div class=\"ibox-title\">\n          <h1><i class=\"fa fa-folder\"></i> Projects</h1>\n          <div class=\"ibox-tools\">\n            <a href=\"#\" id=\"manage-org-projects\">\n              <i class=\"fa fa-plus\"></i>\n            </a>\n          </div>\n        </div>\n        <div class=\"ibox-content\">\n          <div class=\"row cards-box cards-responsive\">\n            <div class=\"cards-size\"></div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\n        </div>\n      </div>\n      <div class=\"ibox float-e-margins\">\n        <div class=\"ibox-title\">\n          <h1>\n                            <i class=\"fa fa-paperclip\"></i>\n                            Attachments\n                            </h1>\n          <div class=\"ibox-tools\">\n            <a href=\"#\" id=\"manage-org-attachments\">\n              <i class=\"fa fa-plus\"></i>\n            </a>\n          </div>\n        </div>\n        <div class=\"ibox-content\">\n          <div class=\"row cards-box cards-responsive\">\n            <div class=\"cards-size\"></div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.attachments : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true});;