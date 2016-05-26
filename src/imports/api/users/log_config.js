import { Meteor } from 'meteor/meteor';
import { Logs } from '/imports/api/logs/logs.js';


Meteor.users.logDriver(Logs, (doc, hook) => {
  let tDoc = hook.transform();
  return tDoc.identification(['username', 'email', 'fullName']);
});
