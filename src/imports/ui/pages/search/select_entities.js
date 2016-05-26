import { Template } from 'meteor/templating';

import './select_entities.html';

Template.selectEntities.helpers({
  entities() {
    return [
      {
        name: 'organizations',
        icon: Icons.collections.organizations
      },
      {
        name: 'projects',
        icon: Icons.collections.projects
      },
      {
        name: 'technologies',
        icon: Icons.collections.technologies
      },
      {
        name: 'attachments',
        icon: Icons.collections.attachments
      },
    ];
  },
  isSelected() {
    let selection = Template.instance().data.selection.get();
    return _.contains(selection, this.name);
  }
});

Template.selectEntities.events({
  'click .select-entity': function(e, template) {
    let selection = template.data.selection;
    let selectionArray = selection.get() || [];
    let exists = _.indexOf(selectionArray, this.name);

    if (exists === -1) {
      selectionArray.push(this.name);
    } else {
      selectionArray.splice(exists, 1);
    }

    selection.set(selectionArray);
  }
});


Template.selectEntities.onCreated(function() {
  this.data.selection = new ReactiveVar();

  this.autorun(() => {
    let selectionArray = this.data.selection.get();
    Session.set('entityFilter', selectionArray);
  });
});
