//import { CollectionsSet } from '../../../imports/api/collections_set/collections_set';

let projectsRoutes = FlowRouter.group({
  prefix: '/projects',
  name: 'Projects'
});

projectsRoutes.route('/', {
  name: 'projects.dashboard',
  title: 'Projects',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsDashboard',
      btnText: 'Create new Project',
      btnLink: 'projects.add',
    });
  }
});


projectsRoutes.route('/add', {
  name: 'projects.add',
  parent: 'projects.dashboard',
  title: 'New Project',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsAdd'
    });
  },
});

projectsRoutes.route('/:id/entry', {
  name: 'projects.entry',
  parent: 'projects.dashboard',
  title() {
    let project = Projects.findOne({
      _id: FlowRouter.getParam('id')
    });
    return project && project.name || 'Unknown Project';
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsEntry'
    });
  },
});


projectsRoutes.route('/:id/edit', {
  name: 'projects.edit',
  parent: 'projects.entry',
  title: 'Edit',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'projectsEdit'
    });
  },
});

projectsRoutes.route('/:id/collections-set/:cSetId', {
  name: 'projects.collectionsSet.entry',
  parent: 'projects.entry',
  title() {
    let collectionSet = CollectionsSet.findOne({
      _id: FlowRouter.getParam('cSetId')
    });
    return collectionSet && collectionSet.name || 'Unknown Collection Set';
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'collectionsSetEntry',
      noPadding: true,
      pageHeading: true
    });
  },
});

