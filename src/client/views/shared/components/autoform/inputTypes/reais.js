 

 AutoForm.addInputType("reais", {
  template: "afInputReais",
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  },
  valueIn:function(val){
    
      return (val)? val.toFixed(2): val;

    //return val.toFixed(2);
  },
  valueOut: function(){

	/*
  	console.log(this);
  	this.masMoney('unmasked');
  	console.log(this.val());
  	*/
  	return this.maskMoney('unmasked')[0];
  }
});

Template.afInputReais.onRendered(function(){
	var el = this.find("input");
	$(el).maskMoney({
		prefix: "R$",
		affixesStay: false,
		thousands: ".",
		decimal: ",",
		allowZero:true

	});
})