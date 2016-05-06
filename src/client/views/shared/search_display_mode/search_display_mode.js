SEARCH_DISPLAY_MODE_PREFIX = 'searchDisplayMode.';
SEARCH_DISPLAY_MODE_DEFAULT = 'grid';
Template.searchDisplayMode.helpers({
  isList() {
    return Session.get(SEARCH_DISPLAY_MODE_PREFIX + Template.instance().data.id) === 'list';
  },
  isGrid() {
    return Session.get(SEARCH_DISPLAY_MODE_PREFIX + Template.instance().data.id) === 'grid';
  }
});

Template.searchDisplayMode.events({
  'click #toggle-list': function(e, t) {
    Session.set(SEARCH_DISPLAY_MODE_PREFIX + t.data.id, 'list');
  },
  'click #toggle-grid': function(e, t) {
    let id = t.data.id;
    Session.set(SEARCH_DISPLAY_MODE_PREFIX + t.data.id, 'grid');
  }
});

Template.searchDisplayMode.onCreated(function() {
  if (!this.data.id) throw new Error('must define a unique id for searchDisplayMode');
  Session.setDefault(SEARCH_DISPLAY_MODE_PREFIX + this.data.id, SEARCH_DISPLAY_MODE_DEFAULT);
});

Template.registerHelper('getSearchDisplayMode', (id) => {
  return Session.get(SEARCH_DISPLAY_MODE_PREFIX + id);
});
