import { Template } from 'meteor/templating';
import './manage_org_projects.html';

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

