Template.manageOrgProjects.helpers({
  projects() {
    return SearchSources.globalSearch.getTransformedData();
  },

  getOptions() {
    return {
      types: ['projects']
    };
  }
});

