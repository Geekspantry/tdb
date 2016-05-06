AutoForm.addInputType("telefone", {
  template: "afInputTelefone",
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  }
});

Template.afInputTelefone.onRendered(function(){
	var el = this.find("input");
	$(el).mask("(99)9999-9999");
})