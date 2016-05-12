import { Technologies } from '../../imports/api/technologies/technologies.js';
import { Projects } from '../../imports/api/projects/projects';


Logs = new Mongo.Collection('logs');


Logs.Schema = new SimpleSchema({
  collection: {
    type: String
  },
  operation: {
    type: String
  },
  userId: {
    type: String,
    optional: true,
  },
  username: {
    type: String,
    optional: true
  },
  description: {
    type: String
  },
  docId: {
    type: String
  },
  docName: {
    type: String
  },
  modifier: {
    type: String,
    optional: true
  }
});

Logs.attachBehaviour('timestampable');
Logs.attachSchema(Logs.Schema);


Logs.helpers({
  user() {
    if (this.userId) {
      return Meteor.users.findOne({
        _id: this.userId
      });
    }
  }
});

Organizations.logDriver(Logs, (doc) => {
  return doc.name;
});
Technologies.logDriver(Logs, (doc) => {
  return doc.name;
});
Attachments.logDriver(Logs, (doc) => {
  return doc.name;
});

Projects.logDriver(Logs, (doc) => {
  return doc.name;
});

Meteor.users.logDriver(Logs, (doc, hook) => {
  let tDoc = hook.transform();
  return tDoc.identification(['username', 'email', 'fullName']);
});
