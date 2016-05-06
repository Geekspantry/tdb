Template.attachmentsFieldInput.events({
  'click .btn-create-attachment': function(e) {
    e.preventDefault();
    Modal.show('attachmentsAddModal');
  }
});

Template.attachmentsFieldInput.helpers({
	name(){
		return Template.instance().data.name;
	}
})

Template.attachmentsFieldInput.onCreated(function(){
  this.subscribe('attachments.quickList');
});
