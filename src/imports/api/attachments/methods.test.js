import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import '../../startup/common/simpleschema_config.js'
import { Attachments } from './attachments.js';
import {
  insert,
  update,
  remove,
} from './methods.js';

if (Meteor.isServer) {
  describe('attachments', function() {
    describe('methods', function() {
      describe('persmissions', function() {
        it('just admin, editor and researcher can insert', function() {
          assert.equal('attachments.insert', insert.name)
          assert.sameMembers(['admin', 'editor', 'researcher'], insert.checkRoles.roles);
        })

        it('just admin and editor can update', function() {
          assert.equal('attachments.update', update.name)
          assert.sameMembers(['admin', 'editor'], update.checkRoles.roles);
        })

        it('just admin and editor can remove', function() {
          assert.equal('attachments.remove', remove.name)
          assert.sameMembers(['admin', 'editor'], remove.checkRoles.roles);
        })
      })
    })
  });
}
