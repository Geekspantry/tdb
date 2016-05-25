import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';

import { Attachments } from './attachments';
import { AttachmentSchema } from './schema.js';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';



/**
 * Insert Attachment
 *
 * Permissions: [admin, editor]
 */
export const insert = new ValidatedMethod({
  name: 'attachments.add',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'attachments.insert.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'attachments.insert.not-authorized',
    }
  },
  validate: AttachmentSchema.validator(),
  run(doc) {
    return Attachments.insert(doc);
  }
});

/**
 * Update Attachment
 *
 * Permissions: [admin, editor]
 */
export const update = new ValidatedMethod({
  name: 'attachments.update',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'attachments.update.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'attachments.update.not-authorized',
    }
  },
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    return Attachments.update(_id, modifier);
  }
});

/**
 * Remove Attachment
 *
 * Permissions: [admin, editor]
 */
export const remove = new ValidatedMethod({
  name: 'attachments.remove',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'attachments.remove.not-logged-in',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'attachments.remove.not-authorized',
    }
  },
  validate: ValidatedMethodRemoveSchema.validator(),
  run({_id}) {
    return Attachments.remove({ _id: _id });
  }
});
