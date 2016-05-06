AutoForm.addInputType("cpf", {
  template: "afInputCpf",
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  }
});

Template.afInputCpf.onRendered(function(){
	var el = this.find("input");
	$(el).mask("999.999.999/99");
})