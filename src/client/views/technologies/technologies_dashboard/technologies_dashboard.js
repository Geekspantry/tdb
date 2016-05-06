Template.technologiesDashboard.events({
  // 'click tbody > tr': function(event) {
  //   handleTableClick(event, (rowData) => {
  //     FlowRouter.go('technologiesEntry', {id: rowData._id});
  //   });
  // }
});


Template.technologiesDashboard.helpers({
  technologiesCount() {
    return Counts.get('docCounter-technologies');
  },
  techSelector() {
    return {
      collection: 'technologies'
    };
  }
});
