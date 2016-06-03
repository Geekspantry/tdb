import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Technologies } from '/imports/api/technologies/technologies';

import './technologies_dashboard_stat.html';

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

Template.technologiesDashboardStat.events({
  'click [data-action="click-published"]'(e, t) {
    if (t.data.onClickPublished) {
      t.data.onClickPublished();
    }
  },
  'click [data-action="click-review"]'(e, t) {
    if (t.data.onClickReview) {
     t.data.onClickReview();
    }
  },
  'click [data-action="click-draft"]'(e, t) {
    if (t.data.onClickDraft) {
      t.data.onClickDraft();
    }
  }
});
