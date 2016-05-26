import { Mongo } from 'meteor/mongo';

Mongo.Collection.prototype.quickList = function(query = {}, identifier = 'name') {
  return this.find(query).map((c) => {
    return {
      label: c[identifier],
      value: c._id
    };
  });
};
