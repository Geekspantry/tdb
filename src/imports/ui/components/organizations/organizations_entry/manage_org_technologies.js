Template.manageOrgTechnologies.helpers({
  technologies() {
    let results =  SearchSources.globalSearch.getTransformedData();
    return results;
  },
  getOptions() {
    return {
      types: ['technologies']
    };
  }
});

