/*
Schemas = {};
Meteor.isClient && Template.registerHelper('Schemas', Schemas);

/*Schemas.contextualDescription = new SimpleSchema([
  Schemas.Description.pick(['userId', 'createdAt', 'applications', 'applications.$', 'benefits', 'benefits.$',
    'longText'
  ]), {
    projectId: {
      type: String,
      autoform: {
        type: 'universe-select',
        afFieldInput: {
          options() {
            return Projects.find().map((res) => {
              return {
                label: res.name,
                value: res._id
              };
            });
          }
        }
      }
    }
  }
]);

Schemas.Scenario = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: [Schemas.Description]
  },
  imgs: {
    type: [Schemas.Image]
  },
  technologiesId: {
    type: [String]
  },
  attachmentsId: {
    type: [String]
  }
});

Schemas.Content = new SimpleSchema({
  type: {
    type: String
  },
  url: {
    type: String
  }
});

Schemas.Search = new SimpleSchema({
  url: {
    type: String,
    autoform: {
      type: 'url'
    }
  }
});
*/
