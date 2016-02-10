const SEARCH_STATUS = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
}

const FETCH_ERRORS = {
  NOT_FOUND: 'ENOTFOUND',
  CONNECTION_REFUSED: 'ECONNREFUSED'
}

Template.searchMetadata.events({
  'input #search-url': _.throttle(function(e, t) {
    let url = e.target.value;

    t.status.set(SEARCH_STATUS.LOADING);
    Meteor.call('getMetadataFromUrl', url, function(err, res) {
      if (err) {
        t.status.set(SEARCH_STATUS.ERROR);
        switch (err.error) {
          case FETCH_ERRORS.NOT_FOUND:
            toastr.error('URL not found.');
            break;
          case FETCH_ERRORS.CONNECTION_REFUSED:
            toastr.error('Connection refused.');
            break;
          default:
            toastr.error('Error getting metadata.');
        }
      } else {
        t.status.set(SEARCH_STATUS.SUCCESS);
        t.data.onSuccess(res);
      }
    });
  }, 250)
});

Template.searchMetadata.helpers({
  statusIconClass() {
    switch (Template.instance().status.get()) {
      case SEARCH_STATUS.NONE:
        return 'fa-search';
      case SEARCH_STATUS.SUCCESS:
        return 'fa-check';
      case SEARCH_STATUS.ERROR:
        return 'fa-bug';
      case SEARCH_STATUS.LOADING:
        return 'fa-spinner fa-spin';
      default:
        return 'fa-question';
    }
  },
});

Template.searchMetadata.onCreated(function() {
  this.status = new ReactiveVar(SEARCH_STATUS.NONE);
});