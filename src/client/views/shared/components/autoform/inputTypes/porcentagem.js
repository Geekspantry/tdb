AutoForm.addInputType("porcentagem", {
  template: "afInputPorcentagem",
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  }
});

Template.afInputPorcentagem.onRendered(function(){
	var el = this.find("input");

	$(el).mask("999.99", {reverse: true});
})