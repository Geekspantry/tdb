/**
 * river
 * simply hooks all mongo operations and drives them to an adapter
 *
 */
 /*
CollectionBehaviours.define('river', function(options) {
  let collection = this.collection;
  let defaultOptions = _.defaults(options, this.options, defaultOptions);
  let adapters = options.adapters || [];
  if (!adapters.length) throw new Error('Must pass at least one adapter');

  // Behaviour logic goes here
  collection.after.insert(function(userId, doc) {
    let transformedDoc = this.transform();
    _.each(adapters, function(adapter) {
      adapter.insertDoc(userId, transformedDoc);
    });
  });

  collection.after.update(function(userId, doc, fieldNames, modifier) {
    let transformedDoc = this.transform();
    _.each(adapters, function(adapter) {
      adapter.updateDoc(userId, transformedDoc, fieldNames, modifier);
    });
  });

  collection.after.remove(function(userId, doc) {
    let transformedDoc = this.transform();
    _.each(adapters, function(adapter) {
      adapter.removeDoc(userId, transformedDoc);
    });
  });
});
*/

/*
Organizations.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'organizations', (doc) => {
      let finalDoc = _.clone(doc);

      let schema = new SimpleSchema({
        name: {
          type: String
        },
        logo: {
          type: String
        }
      });
      schema.clean(finalDoc);

      //  grab cloudinaryId and put on the ES doc
      let img = Images.findOne({_id: doc.logo});
      if (img) {
        finalDoc.cloudinaryId = img.cloudinaryId();
      }
      return finalDoc;
    }),
    new LogAdapter(Logs, Organizations, function(doc) {
      return doc.name;
    })
  ]
});
*/

/*
Attachments.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'attachments', (doc) => {
      let finalDoc = _.clone(doc);

      let schema = new SimpleSchema({
        name: {
          type: String
        },
        description: {
          type: String
        },
        imageUrl: {
          type: String
        }
      });

      schema.clean(finalDoc);
      return finalDoc;
    }),
    new LogAdapter(Logs, Attachments, function(doc) {
      return doc.name;
    })
  ]
});

Projects.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'projects', (doc) => {
      let finalDoc = _.clone(doc);
      let schema = new SimpleSchema({
        name: {
          type: String
        },
        description: {
          type: String
        }
      });
      schema.clean(finalDoc);
      return finalDoc;
    }),
    new LogAdapter(Logs, Projects, function(doc) {
      return doc.name;
    })
  ]
});


Technologies.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'technologies', (doc) => {
      let finalDoc = _.clone(doc);

      let schema = new SimpleSchema({
        name: {
          type: String
        },
        description: {
          type: [Schemas.Description]
        }
      });

      schema.clean(finalDoc);
      let publishedDescription = doc.getPublishedDescription();
      if (publishedDescription && publishedDescription.longText) {
        finalDoc.description = TagStripper.strip(publishedDescription.longText);
      }else {
        delete finalDoc.description;
      }
      return finalDoc;
    }),
    new LogAdapter(Logs, Technologies, function(doc) {
      return doc.name;
    })
  ]
});


Meteor.users.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'users', (doc, modifier) => {
      let finalDoc = _.clone(doc);

      let schema = new SimpleSchema({
        _id: {
          type: String
        },
        'profile.fullName': {
          type: String
        },
        'profile.country': {
          type: String
        },
        'profile.address': {
          type: String
        },
        'profile.imageId': {
          type: String
        },
        'profile.affiliation': {
          type: String
        },
        'profile.contactInfo.mobile': {
          type: String
        },
        'profile.contactInfo.phone': {
          type: String
        },
        username: {
          type: [Schemas.Description]
        },
        emails: {
          type: [Object],
          blackbox: true
        }
      });


      schema.clean(finalDoc);

      // get user's Email
      finalDoc.emails = finalDoc.emails.length && finalDoc.emails.map(function(email) {
        return email.address;
      });

      //  get user's role
      finalDoc.role = Roles.getRolesForUser(finalDoc._id)[0];
      return finalDoc;
    }, {
      trackedFields: ['profile', 'emails', 'username']
    }),
    new LogAdapter(Logs, Meteor.users, function(doc) {
      return doc.identification(['username', 'email', 'fullName']);
    }, {
      trackedFields: ['profile', 'emails', 'username']
    })
  ]
});
*/