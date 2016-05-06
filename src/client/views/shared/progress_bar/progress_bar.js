Template.progressBar.helpers({
	size:function(){
		if (!this.max || !this.value) return 0;
		
		return parseInt(this.value / this.max * 100);
	}
})