// Attach Schema to Users
//import '/imports/api/users/users';
// Configure Simpleschema
//	import '../../config/simpleschema_config.js';
// Attach cloudinaryId to FS

/**
 * Routes
 */

 import './routes';
 
/**
 * Client
 */

import '/imports/api/technologies/technologies.js';
import '/imports/api/attachments/attachments.js';
import '/imports/api/organizations/organizations.js';
import '/imports/api/projects/projects.js';
import '/imports/api/users/users.js';

// Common Code
import '../common/fs.js';
// Attach QuickList
import '../common/quick_list.js';
// Configure CollectionBehaviours
import '../common/collection_behaviours_config.js';
// Attach logDriver to Mongo.Collection
import '../common/log_driver.js';
// Register Collections on Template helpers

// Client specific
import './autoform_scope.js';
// Configure Autoform
import './autoform_config.js';
// Configure Cloudinary
import './cloudinary_config.js';
// Configure Toastr
import './toastr_config.js';
// Import Log Driver config
import './log_config.js';
// Import Components
import './components.js';

