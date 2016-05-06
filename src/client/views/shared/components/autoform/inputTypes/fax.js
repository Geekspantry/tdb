AutoForm.addInputType("fax", {
  template: "afInputFax",
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  }
});

Template.afInputFax.onRendered(function(){
	var el = this.find("input");
	$(el).mask("9999-9999");
})