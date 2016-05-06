
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
      Projects.methods.pushTechnologiesStash.call({ projectId, techId }, (err, res) => {
        Modal.hide();
        if (err) {
          return toastr.error(err.toString(), 'Error');
        }
        toastr.success('Technology added to stash', 'Success');
      });
    };
  }
});
