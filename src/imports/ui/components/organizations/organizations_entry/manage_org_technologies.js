import { Template } from 'meteor/templating';
import './manage_org_technologies.html';

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

