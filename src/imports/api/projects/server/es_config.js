import { Projects } from '../projects';

Projects.esDriver(esClient, 'projects');

Projects.setMapping({
  description: {
    type: 'string'
  },
  image: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  status: {
    type: 'string'
  }
});
