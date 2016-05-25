Template.attachmentsDashboard.helpers({
  attachmentSelector: function() {
    return {
      collection: 'attachments'
    };
  },

  imageUrl: function() {
    let img = $.cloudinary.image(this.imageUrl, {
      width: 600,
      height: 400,
      crop: 'fill',
      type: 'fetch'
    });
    return img[0].src;
  }
});

Template.attachmentsDashboard.events({
  'click .load-more'(e, t) {
    // Inc size by 8
    t.size.set(t.size.get() + 8);
  },

  'input [name="search"]'(e, t) {
    // Set size to default when user starts a new search
    t.size.set(8);
  },
});

Template.attachmentsDashboard.onCreated(function() {
  this.size = new ReactiveVar(8);
});
