Template.safeImg.events({
  'load .safe-img': function(e, template) {
    template.error.set(false);
    template.loadingImg.set(false);
  },
  'error .safe-img': function(e, template) {
    template.error.set(true);
    template.loadingImg.set(false);
  }
});

Template.safeImg.helpers({
  loadingImg: function() {
    return Template.instance().loadingImg.get();
  },
  notFound: function() {
    return '/img/not-found.png';
  },
  error() {
    return Template.instance().error.get();
  }
});

Template.safeImg.onCreated(function() {
  this.loadingImg = new ReactiveVar(true);
  this.data.sHeight = this.data.sHeight || this.data.height;
  this.data.sWidth = this.data.sWidth || this.data.width;
  this.error = new ReactiveVar(false);
  this.lastUrl = this.data.url;

  this.autorun(() => {
    let data = Template.currentData();
    if (data.url !== this.lastUrl) {
      this.loadingImg.set(true);
      this.lastUrl = data.url;
    }
  });
});

Template.safeImg.onRendered(function() {
  if (this.data.onLoad && typeof this.data.onLoad === 'function') {
    this.$('img.safe-image').load(this.data.onLoad);
  }
});

