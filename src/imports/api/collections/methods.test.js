import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import '../../startup/common/simpleschema_config.js'
import { Collections } from './collections.js';
import {
  insert,
  update,
  remove,
  copy,
  addTechnology,
  removeTechnology,
  moveTechnology
} from './methods.js';

if (Meteor.isServer) {
  describe('collections', function() {
    describe('methods', function() {
      describe('persmissions', function() {
        it('just admin, editor can insert', function() {
          assert.equal('collections.insert', insert.name)
          assert.sameMembers(['admin', 'editor'], insert.checkRoles.roles);
        })

        it('just admin and editor can update', function() {
          assert.equal('collections.update', update.name)
          assert.sameMembers(['admin', 'editor'], update.checkRoles.roles);
        })

        it('just admin and editor can remove', function() {
          assert.equal('collections.remove', remove.name)
          assert.sameMembers(['admin', 'editor'], remove.checkRoles.roles);
        })

        it('just admin and editor can copy', function() {
          assert.equal('collections.copy', copy.name)
          assert.sameMembers(['admin', 'editor'], copy.checkRoles.roles);
        })

        it('just admin and editor can add a technology', function() {
          assert.equal('collections.addTechnology', addTechnology.name)
          assert.sameMembers(['admin', 'editor'], addTechnology.checkRoles.roles);
        })

        it('just admin and editor can remove a technology', function() {
          assert.equal('collections.removeTechnology', removeTechnology.name)
          assert.sameMembers(['admin', 'editor'], removeTechnology.checkRoles.roles);
        })

        it('just admin and editor can move a technology', function() {
          assert.equal('collections.moveTechnology', moveTechnology.name)
          assert.sameMembers(['admin', 'editor'], moveTechnology.checkRoles.roles);
        })
      })
    })
  });
}
