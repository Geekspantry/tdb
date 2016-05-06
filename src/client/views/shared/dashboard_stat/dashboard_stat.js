Template.dashboardStat.events({
  // 'click .dashboard-stat': function() {
  //   FlowRouter.go(Template.instance().data.link);
  // }
});

Template.dashboardStat.helpers({
  pathForAdd() {
    return Template.instance().data.pathForAdd || `${Template.instance().data.title.toLowerCase()}.add`;
  }
});

