import { Projects } from '../../api/projects/Projects';
import { Technologies } from '../../api/technologies/technologies';

let collections = {
  Projects,
  Technologies
};

Template.registerHelper('Collections', () => collections);
