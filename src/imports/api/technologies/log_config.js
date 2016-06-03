import { Technologies } from './technologies.js';
import { Logs } from '/imports/api/logs/logs.js';

Technologies.logDriver(Logs, (doc) => {
  return doc.name;
});

