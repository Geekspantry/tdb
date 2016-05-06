Template.mainDashboard.helpers({
  getColor() {
    return function() {
      console.log(Template.instance());
    };
  }
});

Template.mainDashboard.onCreated(function() {
  this.subscribe('docCounter');
});
