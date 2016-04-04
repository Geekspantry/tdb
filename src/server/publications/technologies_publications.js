Meteor.publishComposite('tabularTechnologiesList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      return Technologies.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
  };
});


Meteor.publishComposite('technologies.single', function(techId) {
  check(techId, String);
  this.unblock();

  return {
    find() {
      this.unblock();
      return Technologies.find({
        _id: techId
      });
    },
    children: [{
      find(tech) {
        if (tech.images) {
          let imagesId = _.pluck(tech.images, 'src') || [];
          return Images.find({
            _id: {
              $in: imagesId
            }
          });
        }
      }
    }]
  };
});

Meteor.publish('technologies.quickList', function() {
  return Technologies.find({}, {
    fields: {
      name: 1
    }
  });
});

Meteor.publish('technologies-status-counter', function() {
  Counts.publish(this, 'technologies-published', Technologies.find({
    status: 'published'
  }));
  Counts.publish(this, 'technologies-review', Technologies.find({
    status: 'review'
  }));
  Counts.publish(this, 'technologies-draft', Technologies.find({
    status: 'draft'
  }));
});

Meteor.publish('last-technology-added', function() {
  return Technologies.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});


Meteor.publish('technology.status', function(techId) {
  check(techId, String);

  return Technologies.find({
    _id: techId
  }, {
    fields: {
      status: 1
    }
  });
});