import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import '../../startup/common/simpleschema_config.js'
import { Projects } from './projects.js';
import {
  insert,
  update,
  remove,
  pushTechnologiesStash,
  pullTechnologiesStash
} from './methods.js';

if (Meteor.isServer) {
  describe('projects', function() {
    describe('methods', function() {
      describe('persmissions', function() {
        it('just admin and editor can insert', function() {
          assert.equal('projects.insert', insert.name)
          assert.sameMembers(['admin', 'editor'], insert.checkRoles.roles);
        })

        it('just admin and editor can update', function() {
          assert.equal('projects.update', update.name)
          assert.sameMembers(['admin', 'editor'], update.checkRoles.roles);
        })

        it('just admin and editor can remove', function() {
          assert.equal('projects.remove', remove.name)
          assert.sameMembers(['admin', 'editor'], remove.checkRoles.roles);
        })

        it('just admin and editor can push technologies to stash', function() {
          assert.equal('projects.pushTechnologiesStash', pushTechnologiesStash.name)
          assert.sameMembers(['admin', 'editor'], pushTechnologiesStash.checkRoles.roles);
        })

        it('just admin and editor can pull technologies from stash', function() {
          assert.equal('projects.pullTechnologiesStash', pullTechnologiesStash.name)
          assert.sameMembers(['admin', 'editor'], pullTechnologiesStash.checkRoles.roles);
        })
      })
    })
  });
}
