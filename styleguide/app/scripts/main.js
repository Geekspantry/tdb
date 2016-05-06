// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar);
Handlebars.registerPartial('footer', TDB.templates.footer);
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard);
Handlebars.registerPartial('technologyCard_add', TDB.templates.technologyCard_add);
Handlebars.registerPartial('projectCard', TDB.templates.projectCard);
Handlebars.registerPartial('projectCard_add', TDB.templates.projectCard_add);
Handlebars.registerPartial('collectionView', TDB.templates.collectionView);
Handlebars.registerPartial('projectCollection_element', TDB.templates.projectCollection_element);
Handlebars.registerPartial('attachmentCard', TDB.templates.attachmentCard);
Handlebars.registerPartial('organizationCard', TDB.templates.organizationCard);
Handlebars.registerPartial('latestUpdates', TDB.templates.latestUpdates);

// Helpers
function initMansory() {
  $('.cards-box').masonry({
    // options
    columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true
  });
}

function initProjectEntry() {
  $('.cards-box').masonry({
    // options
    columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true
  });
  $(".sortable-list").sortable({
    connectWith: ".connectList"
  }).disableSelection();
}

// Register routes
TDBRouter.addRoute({
  path: '',
  template: 'mainDashboard'
});

///////////////////
// Technologies //
//////////////////
TDBRouter.addRoute({
  path: '/technologies',
  template: 'technologiesDashboard',
  onRendered: initMansory,
  context: {
    technologies,
    latestUpdates: [{
      object: 'Drone Delivery',
      type: 'gear',
      url: '#/technologies/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }]
  }
});

TDBRouter.addRoute({
  path: '/technologies/edit',
  template: 'technologyEdit',
  onRendered: initMansory,
  context: {
    technologies,
    latestUpdates: [{
      object: 'Drone Delivery',
      type: 'gear',
      url: '#/technologies/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }]
  }
});

TDBRouter.addRoute({
  path: '/technologies/entry',
  template: 'technologyEntry',
  onRendered: initMansory,
  context: {
    technologies, organizations, attachments,
    latestUpdates: [{
      object: 'Drone Delivery',
      type: 'gear',
      url: '#/technologies/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }],
    projects: [{
      name: 'Futuro da Medicina',
      evID: 'EV0091',
      description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
      src: 'images/project.png',
      status: 'Active'
    }]
  }
});


TDBRouter.addRoute({
  path: '/technologies/add',
  template: 'technologyAdd',
  onRendered: initMansory,
  context: {
    technologies,
    latestUpdates: [{
      object: 'Drone Delivery',
      type: 'gear',
      url: '#/technologies/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }]
  }
});

//////////////
// Projects //
//////////////
TDBRouter.addRoute({
  path: '/projects',
  template: 'projectsDashboard',
  onRendered: initMansory,
  context: {
    projects,
    latestUpdates: [{
      object: 'Futuro da Medicina',
      type: 'folder',
      url: '#/projects/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }]
  }
});

TDBRouter.addRoute({
  path: '/projects/add',
  template: 'projectAdd',
  onRendered: initMansory,
  context: {
    projects, technologies, organizations, attachments
  }
});
TDBRouter.addRoute({
  path: '/projects/edit',
  template: 'projectEdit',
  onRendered: initMansory,
  context: {
    projects, technologies, organizations, attachments, collectionSet
  }
});

TDBRouter.addRoute({
  path: '/projects/entry',
  template: 'projectEntry',
  onRendered: initProjectEntry,
  context: {
    projects, collectionSet,
    latestUpdates: [{
      object: 'Futuro da Medicina',
      type: 'folder',
      url: '#/projects/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }]
  }
});
TDBRouter.addRoute({
  path: '/projects/collection',
  template: 'projectCollection',
  onRendered: initProjectEntry,
  context: {
    collectionSet,
    technologiesStash: technologies,
    latestUpdates: [{
      object: 'Futuro da Medicina',
      type: 'folder',
      url: '#/projects/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }]
  }
});



TDBRouter.addRoute({
  path: '/attachments',
  template: 'attachmentsDashboard',
  onRendered: initMansory,
  context: {
    attachments,
    latestUpdates: [{
      object: 'Drone Delivery',
      type: 'gear',
      url: '#/technologies/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }]
  }
});

TDBRouter.addRoute({
  path: '/organizations',
  template: 'organizationsDashboard',
  onRendered: initMansory,
  context: {
    organizations,
    latestUpdates: [{
      object: 'Tesla',
      type: 'building',
      url: '#/organizations/entry',
      action: 'was created',
      author: 'Arthur Soares',
      time: '5 min'
    }]
  }
});

