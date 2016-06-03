import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ValidationError } from 'meteor/mdg:validation-error';

import { Attachments } from './attachments';
import { AttachmentSchema } from './schema.js';
import { ValidatedMethodUpdateSchema, ValidatedMethodRemoveSchema } from '../shared/schemas';



/**
 * Insert Attachment
 */
export const insert = new ValidatedMethod({
  name: 'attachments.insert',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'attachments.insert.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor', 'researcher'],
    rolesError: {
      error: 'attachments.insert.notAuthorized',
    }
  },
  validate: AttachmentSchema.validator(),
  run(doc) {
    return Attachments.insert(doc);
  }
});

/**
 * Update Attachment
 */
export const update = new ValidatedMethod({
  name: 'attachments.update',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'attachments.update.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'attachments.update.notAuthorized',
    }
  },
  validate: ValidatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    return Attachments.update(_id, modifier);
  }
});

/**
 * Remove Attachment
 */
export const remove = new ValidatedMethod({
  name: 'attachments.remove',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'attachments.remove.notLoggedIn',
  },
  checkRoles: {
    roles: ['admin', 'editor'],
    rolesError: {
      error: 'attachments.remove.notAuthorized',
    }
  },
  validate: ValidatedMethodRemoveSchema.validator(),
  run({_id}) {
    return Attachments.remove(_id);
  }
});
