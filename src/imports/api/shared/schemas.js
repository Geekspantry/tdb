import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ValidatedMethodUpdateSchema = new SimpleSchema({
  _id: {
    type: String
  },
  modifier: {
    type: Object,
    blackbox: true
  }
});

export const ValidatedMethodRemoveSchema = new SimpleSchema({
  _id: { type: String }
});


export const StashedTechSchema = new SimpleSchema({
  technologyId: {
    type: String,
    autoform: {
      type: 'universe-select',
      uniPlaceholder: 'Search by technology title...',
/*      options: () => Technologies.quickList({})*/
    }
  },
  techName: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  addedAt: {
    type: Date,
    optional: true
  },
  addedBy: {
    type: String,
    optional: true,
    autoValue() {
      if (Meteor.userId()) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  }
});
