var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Setor adicionado com sucesso: " + this.insertDoc.nome, "Sucesso");
    FlowRouter.go('setores.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "insertSetoresForm": hooksObject
});