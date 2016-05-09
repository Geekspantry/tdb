Schemas = {};
Meteor.isClient && Template.registerHelper('Schemas', Schemas);

Schemas.validatedMethodUpdateSchema = new SimpleSchema({
  _id: {
    type: String
  },
  modifier: {
    type: Object,
    blackbox: true
  }
});

Schemas.validatedMethodRemoveSchema = new SimpleSchema({
  _id: { type: String }
});


Schemas.Description = new SimpleSchema({
  _id: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  },
  updatedBy: {
    type: String,
    optional: true,
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  status: {
    type: String,
    allowedValues: ['draft', 'review', 'published'],
    autoform: {
      sortField: ['a'],
      options() {
        return [{
          s: 'a',
          label: 'Draft',
          value: 'draft',
        }, {
          s: 'b',
          label: 'Review',
          value: 'review',
        }, {
          s: 'c',
          label: 'Published',
          value: 'published',
        }];
      }
    }
  },
  longText: {
    type: String,
    autoform: {
      type: 'markdownEditor',
    }
  },
  shortText: {
    type: String,
    optional: true,
    max: 140,
    autoform: {
      type: 'textarea',
      rows: 3
    }

  },
  applications: {
    type: [String],
    optional: true,
    autoform: {
      omit: true
    }
  },
  benefits: {
    type: [String],
    optional: true,
    autoform: {
      omit: true
    }
  }
});

/*  Opcao 1: selectize
type: 'selectize',
options() {
  return Projects.find().map((project) => {
    return {
      value: project._id,
      label: project.name
    };
  });
}
*/
/*  Opcao 2: type ahead
type: 'typeahead',
typeaheadDatasets: {
  source(query, process) {
    let opt = {
      types: ['projects']
    };
    SearchSources.globalSearch.search(query, opt);
    let rId = Tracker.autorun((comp) => {
      let status = SearchSources.globalSearch.getStatus();
      if (!comp.firstRun) {
        if (status.loaded) {
          comp.stop();
          process(SearchSources.globalSearch.getData().map((project) => {
            return {
              value: project._id,
              label: project.name
            }
          }));
        } else if (status.error) {
          comp.stop()
        }
      }
    });
  }
}
*/
/* Opcao 3: universe select */


Schemas.contextualDescription = new SimpleSchema([
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


Schemas.Url = new SimpleSchema({
  url: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  type: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Schemas.Image = new SimpleSchema({
  src: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'upload',
        collection: 'Images',
        label: 'Choose file',
        //  uploadProgressTemplate: 'customProgressBar'
      }
    },
    label: 'Source'
  },
  description: {
    type: String,
    optional: true
  },
  height: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  },
  width: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  },
  showcased: {
    type: Boolean,
    optional: true
  }
});

Schemas.Impact = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      omit: true
    }
  },
  expertise: {
    type: Number
  },
  industries: {
    type: Object
  }
});

Schemas.Answer = new SimpleSchema({
  q01: {
    type: Number
  },
  q02: {
    type: Number
  },
  q03: {
    type: Number
  },
  q04: {
    type: Number
  },
  q05: {
    type: Number
  },
  q06: {
    type: Number
  },
  q07: {
    type: Number
  },
  q08: {
    type: Number
  },
  q09: {
    type: Number
  },
  q10: {
    type: Number
  }
});

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

Schemas.KeyPeople = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  role: {
    type: String
  },
  image: {
    type: String,
    autoform: {
      type: 'url'
    }
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
