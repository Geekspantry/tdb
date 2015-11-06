Template.senioridades.onRendered(function(){
	var table = $('#senioridadesDT').dataTable();
	$('#search-table').keyup(function () {
		table.fnFilter($(this).val());
	});
});


Template.senioridadesAcoes.helpers({
	beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        var object = this;
		alertify.confirm('Remover <b>' + doc.nome + '</b>?', function(){
			object.remove();
		}).set('title', 'Confirmar');
      };
    },
    onSuccess: function(){
    	return function(result){
    		console.log(result);
    		toastr.success("Senioridade removida com sucesso", "Sucesso");
    	}
    }
})