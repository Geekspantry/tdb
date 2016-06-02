/**
 * Common
 */

import '/imports/ui/components/common/upload_file/upload_file';
import '/imports/ui/components/common/masonry_grid/masonry_grid';
import '/imports/ui/components/common/recent_updates/recent_updates';
import '/imports/ui/components/common/recent_updates/recent_updates_item';
import '/imports/ui/components/common/delete_entity/delete_entity';

import '/imports/ui/components/feedback/feedback.js';

/**
 * Pages
 */
import '/imports/ui/pages/main_dashboard/main_dashboard';
import '/imports/ui/pages/organizations_dashboard/organizations_dashboard';
import '/imports/ui/pages/search/search';
import '/imports/ui/pages/search/search_results';  //	move to components
import '/imports/ui/pages/search/search_source_display'; //	move to components
import '/imports/ui/pages/search/select_entities'; //	move to components

/**
 * Technologies
 */

import '/imports/ui/components/technologies/technologies_dashboard_stat/technologies_dashboard_stat';
import '/imports/ui/components/technologies/technologies_descriptions_form/technologies_descriptions_form';
import '/imports/ui/components/technologies/technologies_descriptions_panel/technologies_descriptions_panel';
import '/imports/ui/components/technologies/technologies_descriptions_tabs/technologies_descriptions_tabs';
import '/imports/ui/components/technologies/technologies_images_input/technologies_images_input';
import '/imports/ui/components/technologies/technologies_images_item/technologies_images_item';
import '/imports/ui/components/technologies/technologies_information_card/technologies_information_card';
import '/imports/ui/components/technologies/technologies_information_table/technologies_information_table';
import '/imports/ui/components/technologies/technologies_status_form/technologies_status_form';
import '/imports/ui/components/technologies/technologies_about_box/technologies_about_box';

import '/imports/ui/components/technologies/technologies_manage_projects/manage_tech_projects.js';
import '/imports/ui/components/technologies/technologies_manage_projects/manage_tech_projects_item.js';


/**
 * Projects
 */

import '/imports/ui/components/projects/projects_about_box/projects_about_box';
import '/imports/ui/components/projects/projects_add/projects_add';
import '/imports/ui/components/projects/projects_card/projects_card';
import '/imports/ui/components/projects/projects_dashboard/projects_dashboard';
import '/imports/ui/components/projects/projects_dashboard_stat/projects_dashboard_stat';
import '/imports/ui/components/projects/projects_edit/projects_edit';
import '/imports/ui/components/projects/projects_edit_modal/projects_edit_modal';
import '/imports/ui/components/projects/projects_entry/projects_entry';
import '/imports/ui/components/projects/projects_tech_stash/tech_stash';
import '/imports/ui/components/projects/projects_tech_stash/tech_stash_item';
import '/imports/ui/components/projects/projects_tech_stash/tech_stash_add';
import '/imports/ui/components/projects/projects_tech_stash/tech_stash_add_item';


/**
 * Organizations
 */

import '/imports/ui/components/organizations/organizations_manage_key_people/organizations_key_people_list';
import '/imports/ui/components/organizations/organizations_manage_key_people/organizations_key_people_item';
import '/imports/ui/components/organizations/organizations_manage_key_people/organizations_key_people_add';
import '/imports/ui/components/organizations/organizations_manage_key_people/organizations_manage_key_people';
import '/imports/ui/components/organizations/organizations_edit/organizations_edit';
import '/imports/ui/components/organizations/organizations_add/organizations_add';
import '/imports/ui/components/organizations/organizations_entry/manage_org_attachments';
import '/imports/ui/components/organizations/organizations_entry/manage_org_attachments_item';
import '/imports/ui/components/organizations/organizations_entry/manage_org_projects';
import '/imports/ui/components/organizations/organizations_entry/manage_org_projects_item';
import '/imports/ui/components/organizations/organizations_entry/manage_org_technologies';
import '/imports/ui/components/organizations/organizations_entry/manage_org_technologies_item';
import '/imports/ui/components/organizations/organizations_entry/organizations_attachments';
import '/imports/ui/components/organizations/organizations_entry/organizations_entry';
import '/imports/ui/components/organizations/organizations_entry/organizations_projects';
import '/imports/ui/components/organizations/organizations_entry/organizations_technologies';
import '/imports/ui/components/organizations/organizations_dashboard_stat/organizations_dashboard_stat';
import '/imports/ui/components/organizations/organizations_card/org_card';
import '/imports/ui/components/organizations/organizations_about_box/organizations_information_table';
import '/imports/ui/components/organizations/organizations_about_box/organizations_about_box';

/**
 * Attachments
 */
import '/imports/ui/components/attachments/attachments_delete/attachments_delete';
import '/imports/ui/components/attachments/attachments_edit/attachments_edit';
import '/imports/ui/components/attachments/attachments_about_box/attachments_about_box';
import '/imports/ui/components/attachments/attachments_about_box/attachments_information_table';
import '/imports/ui/components/attachments/attachments_entry/attachments_entry';
import '/imports/ui/components/attachments/attachments_card/attachments_card';
import '/imports/ui/components/attachments/attachments_add/attachments_add';
import '/imports/ui/components/attachments/attachments_add/attachments_add_modal';
import '/imports/ui/components/attachments/attachments_field_input/attachments_field_input';
import '/imports/ui/components/attachments/attachments_dashboard_stat/attachments_dashboard_stat';
import '/imports/ui/components/attachments/attachments_dashboard/attachments_dashboard';


/**
 * CollectionsSet
 */
import '/imports/ui/components/collections_set/collections_board/collections_board';
import '/imports/ui/components/collections_set/collections_set_add/collections_set_add';
import '/imports/ui/components/collections_set/collections_set_entry/collections_set_entry';
import '/imports/ui/components/collections_set/collections_set_list/collections_set_list';


/**
 * Collections
 */
import '/imports/ui/components/collections/collections_add/collections_add';
import '/imports/ui/components/collections/collections_edit/collections_edit';

/**
 * Users
 */
import '/imports/ui/components/users/users_edit/users_edit_bio';
import '/imports/ui/components/users/users_edit/users_edit_contact_info';
import '/imports/ui/components/users/users_edit/users_edit_information';
import '/imports/ui/components/users/users_entry/users_projects';
import '/imports/ui/components/users/users_about_box/users_about_box';
import '/imports/ui/components/users/users_entry/users_entry';
import '/imports/ui/components/users/manage_users_roles/manage_users_roles';
import '/imports/ui/components/users/manage_users_roles/manage_users_roles_item';
import '/imports/ui/components/users/manage_user_projects/manage_user_projects';
import '/imports/ui/components/users/manage_user_projects/manage_user_projects_item';
import '/imports/ui/components/users/users_card/users_card';
import '/imports/ui/components/users/users_invite/users_invite';
import '/imports/ui/components/users/users_dashboard/users_dashboard';
import '/imports/ui/components/users/users_dashboard_stat/users_dashboard_stat';
import '/imports/ui/components/users/users_accounts/users_login';
import '/imports/ui/components/users/users_accounts/users_enroll';
import '/imports/ui/components/users/users_accounts/users_reset_password';
