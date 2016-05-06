AutoForm.addInputType("cep", {
  template: "afInputCep",
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  }
});

Template.afInputCep.onRendered(function(){
	var el = this.find("input");
	$(el).mask("99999-999");
})