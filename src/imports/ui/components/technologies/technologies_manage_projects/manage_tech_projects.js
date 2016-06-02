import { Template } from 'meteor/templating';
import './manage_tech_projects.html';

Template.manageTechProjects.helpers({
  projects() {
    return SearchSources.globalSearch.getTransformedData();
  },
  getOptions() {
    return {
      types: ['projects']
    };
  }
});
