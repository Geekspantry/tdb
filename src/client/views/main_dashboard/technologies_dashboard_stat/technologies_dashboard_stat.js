import { Technologies } from '../../../../imports/api/technologies/technologies.js';

Template.technologiesDashboardStat.onCreated(function() {
  this.subscribe('technologies-status-counter');
  this.subscribe('last-technology-added');
});

Template.technologiesDashboardStat.helpers({
  totalCount() {
    return Counts.get('technologies-total');
  },
  publishedCount() {
    return Counts.get('technologies-published');
  },
  reviewCount() {
    return Counts.get('technologies-review');
  },
  draftCount() {
    return Counts.get('technologies-draft');
  },
  lastTechnologyAdded() {
    return Technologies.findOne({}, {
      sort: {
        createdAt: -1
      }
    });
  }
});
