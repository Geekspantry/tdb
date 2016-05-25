/*import { Technologies } from '../../imports/api/technologies/technologies.js';
import { Projects } from '../../imports/api/projects/projects';
import { Attachments } from '../../imports/api/projects/projects';
import { Organizations } from '../../imports/api/projects/projects';


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
*/