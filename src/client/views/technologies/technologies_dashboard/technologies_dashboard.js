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
      collection: 'technologies',
      techStatus: 'draft'
    };
  },
  extraOptions() {
    return () => {
      return {
        techStatus: FlowRouter.getQueryParam('techStatus')
      };
    };
  },
  onClickReview() {
    return () => {
      FlowRouter.setQueryParams({
        techStatus: 'review'
      });
    };
  },
  onClickDraft() {
    return () => {
      FlowRouter.setQueryParams({
        techStatus: 'draft'
      });
    };
  },
  onClickPublished() {
    return () => {
      FlowRouter.setQueryParams({
        techStatus: 'published'
      });
    };
  }
});
