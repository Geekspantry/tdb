import { SimpleSchema } from 'meteor/aldeed:simple-schema';
console.log('extending');

SimpleSchema.extendOptions({
  esDriver: Match.Optional(Boolean),
  esDriverTransformation: Match.Optional(Function)
});
SimpleSchema.extendOptions({
  logDriver: Match.Optional(Boolean),
});
