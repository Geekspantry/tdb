Template.searchRemoteFile.events({
  'click .btn-download': function(e, t) {
    let url = $('#search-remote-url').val();

    t.onDownloadBegin();
    Meteor.call('attachData', url, function(err) {
      if (err) {
        t.onDownloadError(err);
      } else {
        Meteor.call('uploadFileFromUrl', url, function(error, fileId) {
          if (error) {
            t.onUploadError(error);
          } else {
            t.fileId.set(fileId);
            t.onUploadBegin(fileId, url);
          }
        });
      }
    });
  }
});

Template.searchRemoteFile.onCreated(function() {
  this.fileId = new ReactiveVar;
  this.fileObj = new ReactiveVar;
  this.status = new ReactiveVar(SEARCH_STATUS.NONE);

  this.autorun(() => {
    let fileId = this.fileId.get();
    if (fileId) {
      this.subscribe('files.single', fileId);
      this.fileObj.set(Files.findOne({ _id: fileId }));

      let fileObj = this.fileObj.get();
      if (fileObj && fileObj.hasStored('files')) {
        this.onUploadSuccess(fileObj);
      }
    }
  });

  this.onUploadError = (error) => {
    $('.btn-download').button('reset');
    this.data.onUploadError && this.data.onUploadError(error);
  };

  this.onDownloadError = (error) => {
    $('.btn-download').button('reset');
    this.data.onDownloadError && this.data.onDownloadError(error);
  };

  this.onDownloadBegin = () => {
    $('.btn-download').button('loading');
    this.data.onDownloadBegin && this.data.onDownloadBegin();
  };

  this.onUploadBegin = (fileId, sourceUrl) => {
    this.data.onUploadBegin && this.data.onUploadBegin(fileId, sourceUrl);
  };

  this.onUploadSuccess = (fileObj) => {
    $('.btn-download').button('reset');
    this.data.onUploadSuccess && this.data.onUploadSuccess(fileObj);
  };
});
