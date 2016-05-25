import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';

import { Attachments } from './attachments';
import { AttachmentSchema } from './schema.js';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error('not-authorized', 'Not authorized');
}


export const insert = new ValidatedMethod({
  name: 'attachments.add',
  validate: AttachmentSchema.validator(),
  run(doc) {
    checkPermissions();
    return Attachments.insert(doc);
  }
});

export const update = new ValidatedMethod({
  name: 'attachments.update',
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    checkPermissions();
    return Attachments.update(_id, modifier);
  }
});

export const remove = new ValidatedMethod({
  name: 'attachments.remove',
  validate: ValidatedMethodRemoveSchema.validator(),
  run({_id}) {
    checkPermissions();
    return Attachments.remove({ _id: _id });
  }
});
