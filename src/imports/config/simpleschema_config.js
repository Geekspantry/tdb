import { SimpleSchema } from 'meteor/aldeed:simple-schema';
console.log("simple schema config");
SimpleSchema.extendOptions({
  esDriver: Match.Optional(Boolean),
  esDriverTransformation: Match.Optional(Function)
});
SimpleSchema.extendOptions({
  logDriver: Match.Optional(Boolean),
});
