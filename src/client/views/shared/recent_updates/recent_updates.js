const ALL_COLLECTIONS_CHAR = '*';
const DEFAULT_INITIAL_COUNT = 5;
const DEFAULT_COUNT_INCREMENT = 5;
const COUNTER_PREFIX = 'recentUpdatesCounter-';

Template.recentUpdates.helpers({
  templateHasIcon() {
    return Template.instance().data.hasIcon;
  },
  logs() {
      let displayCount = Template.instance().displayCount.get();

      if (displayCount === 0) {
        return [];
      }

      let selector = Template.instance().selector;
      return Logs.find(selector, {
        sort: {
          createdAt: -1
        },
        limit: displayCount
      });
    },
    displayCount() {
      return Template.instance().displayCount.get();
    },
    totalCount() {
      return Counts.get(Template.instance().counterIdentifier);
    }
});

Template.scrollbarList.onRendered(function() {
  /*
  this.$('.scrollbar-recent-updates').mCustomScrollbar({
    axis: 'y',
    advanced: {
      updateOnContentResize: true
    }
  });
*/
});


Template.recentUpdates.onCreated(function() {
  if (!this.data.counterId) throw new Error('Must specify a counter Id');
  this.initialCount = this.data.initialCount || DEFAULT_INITIAL_COUNT;
  this.countIncrement = this.data.countIncrement || DEFAULT_COUNT_INCREMENT;
  this.counterIdentifier = COUNTER_PREFIX + this.data.counterId;
  this.counterId = this.data.counterId;
  this.selector = this.data.selector || {};
  this.displayCount = new ReactiveVar(this.initialCount);

  this.autorun(() => {
    let displayCount = this.displayCount;

    if (Counts.has(this.counterIdentifier)) { //  if I have the total amount of documents
      //  upper bound
      if (this.displayCount.get() > Counts.get(this.counterIdentifier)) {
        return this.displayCount.set(Counts.get(this.counterIdentifier));
      }
      //  lower bound
      if (this.displayCount.get() < 0) {
        this.displayCount.set(0);
      }
      this.subscribe('recentUpdates', this.selector, this.counterId, this.displayCount.get());
    } else { // if I don't have, subscribe with limit 0, so I can get the counter cursor
      this.subscribe('recentUpdates', this.selector, this.counterId, 0);
    }
  });
});


Template.recentUpdates.events({
  'click #view-more': function(e, template) {
    template.displayCount.set(template.displayCount.get() + template.countIncrement);
  },
  'click #view-less': function(e, template) {
    template.displayCount.set(template.displayCount.get() - template.countIncrement);
  }
});
