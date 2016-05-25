import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ContactInfoSchema = new SimpleSchema({
  twitter: {
    type: String,
    optional: true
  },
  slack: {
    type: String,
    optional: true
  },
  github: {
    type: String,
    optional: true
  },
  skype: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true,
    esDriver: true
  },
  mobile: {
    type: String,
    esDriver: true,
    optional: true
  }
});


export const ProfileSchema = new SimpleSchema({
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  fullName: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true,
    autoValue: function() {
      let firstName = this.field('profile.firstName');
      let lastName = this.field('profile.lastName');
      if (firstName.isSet && lastName.isSet) {
        return firstName.value + ' ' + lastName.value;
      }
      return firstName.value;
    },
    autoform: {
      omit: true
    },
  },
  birth: {
    type: Date,
    optional: true,
    logDriver: true,
    autoform: {
      type: 'bootstrap-datepicker',
      datePickerOptions: {
        format: 'yyyy/mm/dd',
        language: 'en-US'
      }
    }
  },
  gender: {
    type: String,
    optional: true,
    logDriver: true,
    allowedValues: ['male', 'female'],
    autoform: {
      label: 'Gender',
      type: 'select-radio-inline',
      options: [{
        value: 'male',
        label: 'Male'
      }, {
        value: 'female',
        label: 'Female'
      }]
    }
  },
  affiliation: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true
  },
  address: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true,
    autoform: {
      label: 'Address',
    }
  },
  about: {
    type: String,
    optional: true,
    logDriver: true,
    autoform: {
      type: 'textarea',
      rows: 6
    }
  },
  imageId: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true
  },
  country: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true,
    autoform: {
      type: 'countryFlags'
    }
  },
  contactInfo: {
    type: ContactInfoSchema,
    esDriver: true,
    logDriver: true,
    optional: true,
    blackbox: true
  },
  bio: {
    type: String,
    optional: true,
    logDriver: true,
    autoform: {
      rows: 6
    }
  }
});

//
// Invite
//
export const InviteSchema = new SimpleSchema({
  email: {
    type: String,
    autoform: {
      label: 'Email'
    }
  },
  roles: {
    type: String,
    allowedValues: ['admin', 'editor', 'viewer'],
    autoform: {
      label: 'Role',
      firstOption: 'Select a role',
      type: 'selectize',
      options: [{
        value: 'admin',
        label: 'Admin'
      }, {
        value: 'editor',
        label: 'Editor'
      }, {
        value: 'viewer',
        label: 'Viewer'
      }, ]
    }
  }
});


export const EmailSchema = new SimpleSchema({
  address: {
    type: String,
    esDriver: true,
    regEx: SimpleSchema.RegEx.Email
  },
  verified: {
    type: Boolean
  }
});


/*Schemas.GlobalRoles = new SimpleSchema({
  __global_roles__: {
    type: [String],
    esDriver: true
  }
});*/

//
// Users
//
export const UserSchema = new SimpleSchema({
  username: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true
  },
  emails: {
    type: [EmailSchema],
    esDriver: true,
    logDriver: true,
    autoform: {
      omit: true
    },
  },
  profile: {
    type: ProfileSchema,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  roles: {
    type: [String],
    optional: true,
    esDriver: true,
    logDriver: true,
    blackbox: true
  },
  status: {
    type: Object,
    blackbox: true,
    optional: true
  },
  active: {
    type: Boolean,
    autoValue() {
      return false;
    }
  },
  projectsId: {
    type: [String],
    logDriver: true,
    optional: true
  }
});
