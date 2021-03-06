import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Attachments } from './attachments.js';


const validations = {
  expectedFileReference() {
    let from = this.field('from').value;
    // Non web references needs a file reference.
    if (from === 'web') return true;
    return this.value !== undefined ? true : 'expectedFileReference';
  },

  expectedFileSourceUrl() {
    let from = this.field('from').value;
    if (from !== 'url') return true;
    return this.value !== undefined ? true : 'expectedFileSourceUrl';
  },
  expectedWebReference() {
    let from = this.field('from').value;
    if (from !== 'web') return true;
    return this.value !== undefined ? true : 'expectedWebReference';
  }
};

SimpleSchema.messages({
  expectedFileReference: 'Expected file reference'
});
SimpleSchema.messages({
  expectedWebReference: 'Expected web reference'
});
SimpleSchema.messages({
  expectedFileSourceUrl: 'Expected sourceUrl from remote files'
});


export const AttachmentSchema = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true
  },
  description: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 8
      }
    }
  },
  from: {
    type: String,
    esDriver: true,
    allowedValues: ['web', 'url', 'upload']
  },
  /*
  tags: {
    type: [String],
    optional: true,
    esDriver: true,
    autoform: {
      type: 'tags'
    }
  },
  */
  type: {
    type: String,
    esDriver: true,
    logDriver: true,
    allowedValues: [
      'article',
      'whitepaper',
      'news',
      'news',
      'product_page',
      'media'
    ],
    autoform: {
      type: 'selectize',
      options: [{
        label: 'Article',
        value: 'article'
      }, {
        label: 'Whitepaper',
        value: 'whitepaper'
      }, {
        label: 'News',
        value: 'news',
      }, {
        label: 'Product page',
        value: 'product_page',
      }, {
        label: 'Media',
        value: 'media',
      }]
    }
  },
  web: {
    optional: true,
    esDriver: true,
    custom: validations.expectedWebReference,
    type: new SimpleSchema({
      sourceUrl: {
        type: String,
        esDriver: true,
        regEx: SimpleSchema.RegEx.Url
      },
      thumbnailUrl: {
        type: String,
        esDriver: true,
        label: 'Thumbnail',
        regEx: SimpleSchema.RegEx.Url
      },
    }),
  },
  file: {
    optional: true,
    esDriver: true,
    custom: validations.expectedFileReference,

    type: new SimpleSchema({
      _id: {
        esDriver: true,
        type: String,
      },
      type: {
        esDriver: true,
        type: String,
      },
      sourceUrl: {
        type: String,
        optional: true,
        esDriver: true,
        regEx: SimpleSchema.RegEx.Url,
        custom: validations.expectedFileSourceUrl
      }
    }),
  }

});
