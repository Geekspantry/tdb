import { Projects } from './projects.js';
import { Logs } from '/imports/api/logs/logs.js';


Projects.logDriver(Logs, (doc) => {
  return doc.name;
});

