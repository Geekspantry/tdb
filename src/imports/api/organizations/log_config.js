import { Logs } from '/imports/api/logs/logs.js';
import { Organizations } from './organizations.js';

Organizations.logDriver(Logs, (doc) => {
  return doc.name;
});
