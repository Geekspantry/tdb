'use strict';

// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar);
Handlebars.registerPartial('footer', TDB.templates.footer);
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard);
Handlebars.registerPartial('technologyCard_add', TDB.templates.technologyCard_add);
Handlebars.registerPartial('projectCard', TDB.templates.projectCard);
Handlebars.registerPartial('projectCard_add', TDB.templates.projectCard_add);
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
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: 'images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: 'images/organization.png'
    }],
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
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png'
    }],
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
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png'
    }],
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
      src: '../images/project.png',
      status: 'Active'
    }]
  }
});

TDBRouter.addRoute({
  path: '/technologies/add',
  template: 'technologyAdd',
  onRendered: initMansory,
  context: {
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png'
    }],
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
    projects: [{
      name: 'Futuro da Medicina',
      evID: 'EV0091',
      description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
      src: '../images/project.png',
      status: 'Active'
    }],
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
  path: '/projects/entry',
  template: 'projectEntry',
  onRendered: initProjectEntry,
  context: {
    projects: [{
      name: 'Futuro da Medicina',
      evID: 'EV0091',
      description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
      src: '../images/project.png',
      status: 'Active'
    }],
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
    collectionName: 'Taxonomy',
    technologiesStash: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png'
    }],
    collection: [{
      title: 'IT & Systems',
      description: 'The capacity for being fast and efficient can mean success or failure in the field. With more resources requiring electricity to operate escalating demands should be quelled. Acquiring energy, transmitting energy, and effective use of energy gives an edge in deployed assets for their ability to remain self-sufficient and reduce expenditures on unnecessary losses.',
      subCollection: [{
        title: 'Distribution',
        description: 'Means of distribution',
        technologies: [{
          name: 'Drone Delivery',
          description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
          src: '../images/technology.jpg'
        }, {
          name: 'Other cool technology',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
          src: '../images/organization.png'
        }]
      }]
    }, {
      title: 'IT & Systems',
      description: 'The capacity for being fast and efficient can mean success or failure in the field. With more resources requiring electricity to operate escalating demands should be quelled. Acquiring energy, transmitting energy, and effective use of energy gives an edge in deployed assets for their ability to remain self-sufficient and reduce expenditures on unnecessary losses.',
      subCollection: [{
        title: 'Distribution',
        description: 'Means of distribution',
        technologies: [{
          name: 'Drone Delivery',
          description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
          src: '../images/technology.jpg'
        }, {
          name: 'Other cool technology',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
          src: '../images/organization.png'
        }]
      }, {
        title: 'Production',
        description: 'Means of distribution',
        technologies: [{
          name: 'Drone Delivery',
          description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
          src: '../images/technology.jpg'
        }, {
          name: 'Other cool technology',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
          src: '../images/organization.png'
        }]
      }]
    }],
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
    attachments: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/attachment.jpg',
      type: 'Media'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png',
      type: 'Article'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png',
      type: 'Article'
    }],
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
    organizations: [{
      name: 'Tesla',
      description: 'Tesla Motors, Inc. is an American automotive and energy storage company that designs, manufactures, and sells luxury electric cars, electric vehicle powertrain components, and battery products.',
      src: '../images/organization.png',
      type: 'Private'
    }],
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
//# sourceMappingURL=main.js.map