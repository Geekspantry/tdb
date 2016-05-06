Template.manageOrgAttachments.helpers({
  attachments() {
    return SearchSources.globalSearch.getTransformedData();
  },

  getOptions() {
    return {
      types: ['attachments']
    };
  }
});

