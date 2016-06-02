import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import '../../startup/common/simpleschema_config.js'
import { Organizations } from './organizations.js';
import {
  insert,
  update,
  remove,
  addProject,
  removeProject,
  addTechnology,
  removeTechnology,
  addAttachment,
  removeAttachment,
  addKeyPeople,
  removeKeyPeople
} from './methods.js';

if (Meteor.isServer) {
  describe('organizations', function() {
    describe('methods', function() {
      describe('persmissions', function() {
        it('just admin, editor and researcher can insert', function() {
          assert.equal('organizations.insert', insert.name)
          assert.sameMembers(['admin', 'editor', 'researcher'], insert.checkRoles.roles);
        })

        it('just admin, editor and researcher can update', function() {
          assert.equal('organizations.update', update.name)
          assert.sameMembers(['admin', 'editor', 'researcher'], update.checkRoles.roles);
        })

        it('just admin and editor can remove', function() {
          assert.equal('organizations.remove', remove.name)
          assert.sameMembers(['admin', 'editor'], remove.checkRoles.roles);
        })

        it('just admin and editor can add a project relation', function() {
          assert.equal('organizations.addProject', addProject.name)
          assert.sameMembers(['admin', 'editor'], addProject.checkRoles.roles);
        })

        it('just admin and editor can remove a project relation', function() {
          assert.equal('organizations.removeProject', removeProject.name)
          assert.sameMembers(['admin', 'editor'], removeProject.checkRoles.roles);
        })

        it('just admin, editor and researcher can add a technology relation', function() {
          assert.equal('organizations.addTechnology', addTechnology.name)
          assert.sameMembers(['admin', 'editor', 'researcher'], addTechnology.checkRoles.roles);
        })

        it('just admin and editor can remove a technology relation', function() {
          assert.equal('organizations.removeTechnology', removeTechnology.name)
          assert.sameMembers(['admin', 'editor'], removeTechnology.checkRoles.roles);
        })

        it('just admin, editor and researcher can add an attachment relation', function() {
          assert.equal('organizations.addAttachment', addAttachment.name)
          assert.sameMembers(['admin', 'editor', 'researcher'], addAttachment.checkRoles.roles);
        })

        it('just admin, editor and researcher can add key people', function() {
          assert.equal('organizations.addKeyPeople', addKeyPeople.name)
          assert.sameMembers(['admin', 'editor', 'researcher'], addKeyPeople.checkRoles.roles);
        })

        it('just admin and editor can remove key people', function() {
          assert.equal('organizations.removeKeyPeople', removeKeyPeople.name)
          assert.sameMembers(['admin', 'editor'], removeKeyPeople.checkRoles.roles);
        })
      })
    })
  });
}
