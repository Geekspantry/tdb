import { Projects } from '../../api/projects/projects';
import { Technologies } from '../../api/technologies/technologies';
import { CollectionsSet } from '../../api/collections_set/collections_set';

let collections = {
  Projects,
  Technologies,
  CollectionsSet
};

Template.registerHelper('Collections', () => collections);
