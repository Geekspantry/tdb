Template.techStashAddItem.events({
  'click .select-item': function(event, template) {
    template.data.onClick && template.data.onClick(this._id);
  }
});
