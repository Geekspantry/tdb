AutoForm.addInputType("celular", {
  template: "afInputCelular",
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  }
});

Template.afInputCelular.onRendered(function(){
	var el = this.find("input");
	$(el).mask("(99)99999-9999");
})