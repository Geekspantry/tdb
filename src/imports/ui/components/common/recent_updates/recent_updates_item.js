import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Technologies } from '/imports/api/technologies/technologies';
import { Colors, Icons } from '/imports/resources/resources';

import './recent_updates_item.html';

Template.recentUpdatesItem.helpers({
  getText() {
    switch (Template.instance().data.operation) {
      case 'update': return 'was updated by';
      case 'insert': return 'was inserted by';
      case 'remove': return 'was removed by';
      default: return 'unknown operation by';
    }
  },
  color() {
    return Colors.operations[this.operation] || ColorMap.operations.default;
  },
  icon() {
    return Icons.collections[this.collection] || Icons.collections.default;
  },
  routeName() {
    return `${this.collection}.entry`;
  },
  tech() {
    return Technologies.findOne({
      _id: Template.instance().data.docId
    });
  }
});

Template.recentUpdatesItem.onCreated(function() {
  if (this.data.collection === 'technologies') {
    this.subscribe('technology.status', this.data.docId);
  }
});
