Template.usersDashboard.events({
  'click tbody > tr': function(event) {
    handleTableClick(event, (rowData) => {
      FlowRouter.go('usersEntry', {id: rowData._id});
    });
  }
});
