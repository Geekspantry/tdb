//
//  Allow SimpleSchema to have counterFor field
/*//
SimpleSchema.extendOptions({
  counterFor: Match.Optional(String),
});


Mongo.Collection.prototype.simpleCounter = function() {
  //
  //  check if there is an attached SimpleSchema instance
  //
  if (!this.simpleSchema()) {
    throw new Error('SimpleCounter needs an attached SimpleSchema instance.');
  }

  //
  //  grab collection simpleSchema instance
  //
  let schema = this.simpleSchema().schema();
  this.simpleCounter.keys = [];
  //
  //  grab keys that have esDriver: true
  //
  for (let key in schema) {
    if (schema[key].counterFor) {
      this.simpleCounter.keys.push({
        key: key,
        counterFor: schema[key].counterFor
      });
    }
  }

  console.log(this.simpleCounter.keys);

  //
  //  create a new schema from them
  //
  
  //
  //  Using self because inside hooks I need "this"
  //
  let self = this;
  //
  //  "insert" hooks
  //
  this.after.insert(function(userId, doc) {
  /*  let $modifier = {
      $set: {}
    };

    _.each(self.simpleCounter.keys, (tracked) => {
      let targetField = doc[tracked.counterFor]
      $modifier.$set[tracked.key] = _.isArray(targetField) ? targetField.length : 0;
      console.log(tracked.key, ' - ', doc[tracked.counterFor]);
    })*/
  /*});*/

  //
  //  "update" hook
  //
  /*this.after.update(function(userId, doc, fieldNames, modifier) {*/
    
  /*});*/

  //
  //  "remove" hook
  //
  /*this.after.remove(function(userId, doc) {*/

  /*});*/
/*};*/