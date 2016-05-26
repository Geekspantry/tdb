import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ImageSchema = new SimpleSchema({
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