Template.btnTooltip.onRendered(function() {
  this.$('[data-toggle="tooltip"]').tooltip();
});
Template.btnTooltip.events({
  'click button': function(event, template) {
    this.onClick && this.onClick(event, template);
  }
});
