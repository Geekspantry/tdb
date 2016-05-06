Template.collectionsSetList.events({
  'click .add-collection-set': function(event, template) {
    Modal.show('collectionsSetAdd', {
      projectId: template.data._id
    });
  }
});
