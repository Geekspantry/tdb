AutoForm.addInputType("rg", {
  template: "afInputRg",
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  }
});

Template.afInputRg.onRendered(function(){
	var el = this.find("input");
	$(el).mask("99.999.999-9");
})