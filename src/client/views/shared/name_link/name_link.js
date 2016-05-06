Template.nameLinkTeste.helpers({
	link:function(){
		var route = this.column + ".view";
		var id = this.data[this.column + "Id"];

		console.log(route,id);

		return {
			route: route,
			id: id
		}
	}
	
})