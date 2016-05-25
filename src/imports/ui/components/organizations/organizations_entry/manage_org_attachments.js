import { Template } from 'meteor/templating';
import './manage_org_attachments.html';

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

