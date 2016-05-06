import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { insert } from '../../../../api/technologies_descriptions/methods.js';
import { DESCRIPTION_STATUS } from '../../../../api/technologies_descriptions/schema.js';

import './technologies_descriptions_panel.html';

Template.technologiesDescriptionsPanel.events({
  'click [data-action="create-new-draft"]': function(event, template) {
    const longText =
`# A nice title
With a nice description.
- Some bullet boints
- Other one

> A quote at the end`;

    insert.call({
      technologyId: this._id,
      status: DESCRIPTION_STATUS.DRAFT,
      shortText: 'A nice summary',
      longText
    }, (err, res) => {
      if (err) return toastr.error(err.error);
      return toastr.success('A new draft was created', 'Success');
    });
  }
});

Template.technologiesDescriptionsPanel.helpers({
  hasDescriptions() {
    return Template.instance().data.descriptions().fetch().length > 0;
  }
});
