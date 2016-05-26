
/**
 * Server
 */

// Common Code
// Attach helpers to FS
import '../common/fs.js';
// Attach QuickList
import '../common/quick_list.js';
// Configure Moment Format
import '../common/mo_format_config.js';
// Configure CollectionBehaviours
import '../common/collection_behaviours_config.js';
// Attach logDriver to Mongo.Collection
import '../common/log_driver.js';

// Server Specific
// Fixtures
import './fixtures.js';
// Configure Kadira
import './kadira_config.js';
// Configure Cloudinary
import './cloudinary_config.js';
// Configure UserAccounts
import './useraccounts_config.js';
// Attach cloudinaryId to FS
// Defines all the collections, publications and methods that the application provides as an API to the client.
import './api.js';
