Collections = new Mongo.Collection('collections');
Collections.attachSchema(Schemas.Collection);
Collections.attachBehaviour('timestampable');

Collections.helpers({
  childCollections() {
    return Collections.find({
      parentId: this._id
    });
  },
  techCount() {
    return this.technologiesId && this.technologiesId.length || 0;
  }
});