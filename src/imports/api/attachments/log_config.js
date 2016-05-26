import { Attachments } from './attachments.js';
import { Logs } from '/imports/api/logs/logs.js';


Attachments.logDriver(Logs, (doc) => {
  return doc.name;
});

