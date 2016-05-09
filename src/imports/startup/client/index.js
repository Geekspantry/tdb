import { Technologies } from '../../api/technologies/technologies.js';
import { TechnologiesDescriptions } from '../../api/technologies_descriptions/technologies_descriptions.js';
import { Projects } from '../../api/technologies/technologies.js';
import { CollectionsSet } from '../../api/collections_set/collections_set.js';

import './autoform_scope.js';
import './components.js';

// Fix autoForm scope bug
window.Technologies = Technologies;
window.TechnologiesDescriptions = TechnologiesDescriptions;
