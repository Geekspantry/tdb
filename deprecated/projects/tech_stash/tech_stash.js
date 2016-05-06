Template.techStash.events({
  'click .add-to-stash': function(event, template) {
    Modal.show('techStashAdd', {
      projectId: template.data.projectId
    });
  },
  'input .stash-filter': function(e, t) {
    t.filter.set($(e.target).val());
  }
});

Template.techStash.helpers({
  filteredTechnologiesStash() {
    let filteredProject = Projects.findOne({
      _id: this.projectId
    });

    buildRegExp = function(searchText) {
      let words = searchText.trim().split(/[ \-\:\.]+/);
      let exps = _.map(words, function(word) {
        return `(?=.*${word})`;
      });
      let fullExp = exps.join('') + '.+';
      return new RegExp(fullExp, 'i');
    };

    return filteredProject.technologiesStash.filter(stash => buildRegExp(Template.instance().filter.get()).test(stash.techName));
  },
  getTechnology() {
    return Technologies.findOne(this.technologyId);
  }
});

Template.techStash.onRendered(function() {
  if (this.data.style === 'vertical') {
    let drake = Template.instance().data.drake;
    drake.containers.push(this.find('.stash-drag-area'));
  }
});

Template.techStash.onCreated(function() {
  this.filter = new ReactiveVar('');
});
