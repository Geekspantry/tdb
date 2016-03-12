Attachments = new Mongo.Collection('attachments');


// =================================
// ======== Validations ============
// =================================

Attachments.validations = {

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

SimpleSchema.messages({ expectedFileReference: 'Expected file reference' });
SimpleSchema.messages({ expectedWebReference: 'Expected web reference' });
SimpleSchema.messages({ expectedFileSourceUrl: 'Expected sourceUrl from remote files' });


// =================================
// ========== Helpers ==============
// =================================

Attachments.helpers({
  isFromWeb() {
    return this.from === 'web';
  }
});

// =================================
// ========== Schema ==============
// =================================

Schemas.Attachment = new SimpleSchema({
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
    allowedValues: ['a', 'b', 'c'],
    autoform: {
      type: 'selectize',
      options: [{
        label: 'A',
        value: 'a'
      }, {
        label: 'B',
        value: 'b'
      }, {
        label: 'C',
        value: 'c'
      }]
    }
  },
  web: {
    optional: true,
    esDriver: true,
    custom: Attachments.validations.expectedWebReference,
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
    custom: Attachments.validations.expectedFileReference,

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
        esDriver: true,
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        custom: Attachments.validations.expectedFileSourceUrl
      }
    }),
  }

});


Attachments.attachSchema(Schemas.Attachment);
Attachments.attachBehaviour('timestampable');
Meteor.isServer && Attachments.esDriver(esClient, 'techdb', 'attachments');
