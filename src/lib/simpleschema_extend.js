SimpleSchema.extendOptions({
  esDriver: Match.Optional(Boolean),
  esDriverTransformation: Match.Optional(Function)
});
SimpleSchema.extendOptions({
  logDriver: Match.Optional(Boolean),
});
