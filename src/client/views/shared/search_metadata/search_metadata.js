import { getMetadataFromUrl } from '/imports/api/meta_inspector/methods.js';

const FETCH_ERRORS = {
  NOT_FOUND: 'ENOTFOUND',
  CONNECTION_REFUSED: 'ECONNREFUSED'
};

Template.searchMetadata.events({
  'click .btn-fetch': _.throttle(function(e, t) {
    let url = $('#search-url').val().trim();

    t.status.set(SEARCH_STATUS.LOADING);
    $(e.target).button('loading');
    getMetadataFromUrl.call({ url }, function(err, res) {
      if (err) {
        $(e.target).button('reset');
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
        $(e.target).button('reset');
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
