SearchSources = {};
SearchSource.prototype.clearResults = function() {
  this.store.remove({});
  this.metaData.set({});
};

const SEARCH_THROTTLE = 200;
const SEARCH_OPTIONS = {
  keepHistory: false,
  localSearch: false
};
SearchSources.globalSearch = new SearchSource('globalSearch', ['name', 'description', 'techId'],
  SEARCH_OPTIONS);

SearchSources.userSearch = new SearchSource('userSearch', ['profile.fullName', 'username', 'emails.address'],
  SEARCH_OPTIONS);
SearchSource.prototype.getTransformedData = function() {
  return this.getData({
    transform(matchText, regExp) {
      matchText = String(matchText);

      if (matchText.replace) {
        return matchText.replace(regExp, '<em>$&</em>');
      }
      return matchText;
    }
  });
};

Template.searchSource.helpers({
  metadata() {
    return Template.instance().source.getMetadata();
  },
  searchStatus() {
    return Template.instance().source.getStatus();
  }
});


Template.searchSource.events({
  'input #search-text': _.throttle(function(e, t) {
    let el = $(e.target);
    let searchText = el.val();
    t.searchText.set(searchText);
  }, 200),
  'click .refresh': function(e, t) {
    t.makeSearch();
  }
});

Template.searchSource.onCreated(function() {
  this.source = this.data.source;
  this.options = this.data.options || {};
  this.searchText = new ReactiveVar('');
  this.makeSearch = function() {
    let opt = typeof this.options === 'function' ? this.options() : this.options;

    if (!!this.searchText.get()) {
      this.source.search(this.searchText.get(), opt);
    } else {
      this.source.clearResults();
    }
  };

  if (!this.source || !this.source instanceof SearchSource) {
    throw new Error('source must be instance of SearchSource');
  }
  this.autorun(() => {
    this.makeSearch();
  });

  this.searchAgainTimeout = Meteor.setTimeout(() => {
    this.makeSearch();
  }, 1000);
});

Template.searchSource.onDestroyed(function() {
  this.source.clearResults();
});
