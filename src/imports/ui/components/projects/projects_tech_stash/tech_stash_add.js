import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { ReactiveVar } from 'meteor/reactive-var';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import 'meteor/chrismbeckett:toastr';

import { Projects } from '../../../../api/projects/projects';
//  import { regex } from '../../../lib/regex_helpers/regex_helpers.js';
import { pushTechnologiesStash } from '../../../../api/projects/methods.js';

import './tech_stash_add.html';


Template.techStashAdd.helpers({
  technologies() {
    let results = SearchSources.globalSearch.getTransformedData();
    return results;
  },
  getOptions() {
    let project = Projects.findOne({
      _id: Template.instance().data.projectId
    }, {
      fields: {
        technologiesStash: 1
      }
    });
    let stashedTechIds = _.pluck(project.technologiesStash, 'technologyId');
    return {
      types: ['technologies'],
      excludeIds: stashedTechIds
    };
  },
  onClick() {
    let projectId = Template.instance().data.projectId;
    return (techId) => {
      pushTechnologiesStash.call({ projectId, techId }, (err, res) => {
        Modal.hide();
        if (err) {
          return toastr.error(err.toString(), 'Error');
        }
        toastr.success('Technology added to stash', 'Success');
      });
    };
  }
});
