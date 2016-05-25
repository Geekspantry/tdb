AutoForm.setDefaultTemplate('bootstrap3-horizontal');

// Fix null array items
// See https://github.com/aldeed/meteor-autoform/issues/840
AutoForm.addHooks(null, {
  before: {
    'method-update': function(doc) {
      _.each(doc.$set, function(value, setter) {
        if (_.isArray(value)) {
          let newValue = _.compact(value);
          doc.$set[setter] = newValue;
        }
      });
      return doc;
    }
  }
});
