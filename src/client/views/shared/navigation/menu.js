const ADMIN = ['admin'];
const ADMIN_EDITOR = ['admin', 'editor'];
const ADMIN_EDITOR_VIEWER = ['admin', 'editor', 'viewer'];

Template.menu.helpers({
  items: function() {
    return [
      {
        regex: '^search',
        name: 'Search',
        linkTo: 'search',
        icon: 'fa fa-search',
        roles: ADMIN_EDITOR_VIEWER,
      },
      {
        regex: '^dashboard',
        name: 'Dashboard',
        linkTo: 'dashboard',
        icon: 'fa fa-dashboard',
        roles: ADMIN_EDITOR_VIEWER,
      },
      {
        regex: '^users',
        name: 'Users',
        linkTo: 'users.dashboard',
        icon: 'fa fa-users',
        roles: ADMIN_EDITOR_VIEWER,
      },
      {
        regex: '^technologies',
        name: 'Technologies',
        linkTo: 'technologies.dashboard',
        icon: Icons.collections.technologies,
        roles: ADMIN_EDITOR_VIEWER,
      },
      {
        regex: '^projects',
        name: 'Projects',
        linkTo: 'projects.dashboard',
        icon: Icons.collections.projects,
        roles: ADMIN_EDITOR_VIEWER,
      },
      {
        regex: '^organizations',
        name: 'Organizations',
        linkTo: 'organizations.dashboard',
        icon: Icons.collections.organizations,
        roles: ADMIN_EDITOR_VIEWER,
      },
      {
        regex: '^attachments',
        name: 'Attachments',
        linkTo: 'attachments.dashboard',
        icon: Icons.collections.attachments,
        roles: ADMIN_EDITOR_VIEWER,
      }
    ];
  }
});
