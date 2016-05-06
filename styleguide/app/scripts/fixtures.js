const technologies = [{
  evID: '0091',
  name: 'Drone Delivery',
  description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
  src: 'images/technology.jpg',
  status: 'Published'
}, {
  evID: '0092',
  name: 'Aerogel',
  description: 'A synthetic, porous (99.8% air), ultralight material derived from a gel, in which the liquid component of the gel has been replaced with a gas. Valued for its low density and superb thermal insulation properties, aerogel has a number of potential use cases, such as: chemical absorbers for clean-up of spills, electrochemical supercapacitors and shock absorption.',
  src: 'http://res.cloudinary.com/envisioning/image/upload/c_fill,g_center,h_400,w_600/v1/s3-staging/images/Z5n6f3qZh8YSQS8XF',
  status: 'Draft'
}, {
  evID: '0094',
  name: 'Selfie Security',
  description: 'As people become more mobile, and automation and digital technologies more pervasive, security becomes increasingly important. Online services migrate towards two-step authentication, instead of only passwords, whereas identity documents include biometric data.',
  src: 'http://res.cloudinary.com/envisioning/image/upload/c_fill,g_center,h_400,w_600/v1/s3-staging/images/hfm3ZAxQWQBrGw47Q',
  status: 'Review'
}, {
  evID: '0095',
  name: 'Oie',
  description: 'As people become more mobile, and automation and digital technologies more pervasive, security becomes increasingly important. Online services migrate towards two-step authentication, instead of only passwords, whereas identity documents include biometric data.',
  src: 'http://res.cloudinary.com/envisioning/image/upload/c_fill,g_center,h_400,w_600/v1/s3-staging/images/hfm3ZAxQWQBrGw47Q',
  status: 'Review'
}];

const organizations = [{
  name: 'Tesla',
  description: 'Tesla Motors, Inc. is an American automotive and energy storage company that designs, manufactures, and sells luxury electric cars, electric vehicle powertrain components, and battery products.',
  src: 'images/organization.png',
  type: 'Private'
}]

const attachments = [{
  name: 'Drone Delivery',
  description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
  src: 'images/attachment.jpg',
  type: 'Media'
}, {
  name: 'Other cool technology',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
  src: 'images/organization.png',
  type: 'Article'
}, {
  name: 'Other cool technology',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
  src: 'images/organization.png',
  type: 'Article'
}]


const projects = [{
  name: 'Futuro da Medicina',
  evID: 'EV0091',
  description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
  src: 'images/project.png',
  status: 'Active'
}, {
  name: 'Futuro da Medicina',
  evID: 'EV0091',
  description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
  src: 'images/project.png',
  status: 'Active'
}, {
  name: 'Futuro da Medicina',
  evID: 'EV0091',
  description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
  src: 'images/project.png',
  status: 'Active'
}];

const collectionSet = [{
  name: 'Taxonomy',
  description: 'This is what goes inside',
  collection: [{
    title: 'Energy',
    description: 'The capacity for being fast and efficient can mean success or failure in the field. With more resources requiring electricity to operate escalating demands should be quelled. Acquiring energy, transmitting energy, and effective use of energy gives an edge in deployed assets for their ability to remain self-sufficient and reduce expenditures on unnecessary losses.',
    subCollection: [{
      title: 'Efficiency',
      description: 'The capacity for being fast and efficient can mean success or failure in the field. With more resources requiring electricity to operate escalating demands should be quelled. Acquiring energy, transmitting energy, and effective use of energy gives an edge in deployed assets for their ability to remain self-sufficient and reduce expenditures on unnecessary losses.',
      technologies: [{
        name: 'Drone Delivery',
        description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
        src: 'images/technology.jpg'
      }, {
        name: 'Other cool technology',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
        src: 'images/organization.png'
      }]
    }, {
      title: 'Management',
      description: 'Currently energy infrastructure is experiencing vulnerability due to it\'s highly localized and outdated methodologies. The systems are vulnerable to cyber-penetration attacks; and, system fluctuations. As the global demands rise for energy, so does the need for dynamic and effective energy management solutions.',
      technologies: [{
        name: 'Drone Delivery',
        description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
        src: 'images/technology.jpg'
      }, {
        name: 'Other cool technology',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
        src: 'images/organization.png'
      }]
    }, {
      title: 'Propulsion',
      description: 'Moving assets from one location to another is a vital component in any operation; whether it\'s for surveilence & reconnessance or for deploying. Advancements in other energy areas can lead to jumps here.Technologies in this sector should always be watched closely.',
      technologies: [{
        name: 'Drone Delivery',
        description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
        src: 'images/technology.jpg'
      }, {
        name: 'Other cool technology',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
        src: 'images/organization.png'
      }]
    }, {
      title: 'Storage',
      description: 'Energy storage and transport has had very little innovation for quite some time; this opportunity has been recognized by large commercial players as well as research institutes. Renewed interest has spurred innovation and incentives for transforming the sector; with recent developments showing large promise for noticable increases in performance.',
      technologies: [{
        name: 'Drone Delivery',
        description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
        src: 'images/technology.jpg'
      }, {
        name: 'Other cool technology',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
        src: 'images/organization.png'
      }]
    }]
  }, {
    title: 'IT & Systems',
    description: 'The capacity for being fast and efficient can mean success or failure in the field. With more resources requiring electricity to operate escalating demands should be quelled. Acquiring energy, transmitting energy, and effective use of energy gives an edge in deployed assets for their ability to remain self-sufficient and reduce expenditures on unnecessary losses.',
    subCollection: [{
      title: 'Communications',
      description: 'Bottlenecks in communicative infrastructures can cause catastrophic failures. Data is growing exponentially; and, it must be transmitted between multitudes of new devices. There are several methods being explored and built to handle the new loads.',
      technologies: [{
        name: 'Drone Delivery',
        description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
        src: 'images/technology.jpg'
      }, {
        name: 'Other cool technology',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
        src: 'images/organization.png'
      }]
    }, {
      title: 'Computation',
      description: 'Computational abilities are affected by several underlying technologies and innovations; and, is one of the largest sectors in the market. The implications for breakthroughs can mean drastic shifts in short amounts of time. Moore\'s Law continues to be relevant.',
      technologies: [{
        name: 'Drone Delivery',
        description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
        src: 'images/technology.jpg'
      }, {
        name: 'Other cool technology',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
        src: 'images/organization.png'
      }]
    }, {
      title: 'Internet of Things',
      description: 'Combining sensor technology with increased efficiencies is allowing for an explosion of new information available for monitoring and interacting with. From infrastructural and machine parts, to innumerable real world contexts like pedestrian flow to anything you might be holding right now.',
      technologies: [{
        name: 'Drone Delivery',
        description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
        src: 'images/technology.jpg'
      }, {
        name: 'Other cool technology',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
        src: 'images/organization.png'
      }]
    }]
  }]
}];
