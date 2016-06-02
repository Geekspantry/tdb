import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import '../../startup/common/simpleschema_config.js'
import { ProfileOwnerMixin } from './mixins.js';
import { resetDatabase } from 'meteor/xolvio:cleaner'


import {
  invite,
  updateRole,
  updateImage,
  remove,
  updateProfile,
  addProject,
  removeProject,
} from './methods.js';

if (Meteor.isServer) {
  describe('users', function() {
    describe('methods', function() {
      describe('persmissions', function() {

        it('just admin can invite', function() {
          assert.equal('users.invite', invite.name)
          assert.sameMembers(['admin'], invite.checkRoles.roles);
        })

        it('just admin can update user role', function() {
          assert.equal('users.updateRole', updateRole.name)
          assert.sameMembers(['admin'], updateRole.checkRoles.roles);
        })

        it('just admin and owner can update user profile image', function() {
          assert.equal('users.updateImage', updateImage.name)
          assert.sameMembers(['admin'], updateImage.checkRoles.roles);

          // TODO: We need to find a way to test if the method is using a given mixin.
          // In this case we want to check if is using the ProfileOwnerMixin.
          // https://github.com/meteor/validated-method/issues/54
        })

        it('just admin and owner can update user profile', function() {
          assert.equal('users.updateProfile', updateProfile.name)
          assert.sameMembers(['admin'], updateProfile.checkRoles.roles);

          // TODO: We need to find a way to test if the method is using a given mixin.
          // In this case we want to check if is using the ProfileOwnerMixin.
          // https://github.com/meteor/validated-method/issues/54
        })

        it('just admin can remove', function() {
          assert.equal('users.remove', remove.name)
          assert.sameMembers(['admin'], remove.checkRoles.roles);
        })  

        it('just admin can add a project relation to a user', function() {
          assert.equal('users.addProject', addProject.name)
          assert.sameMembers(['admin'], addProject.checkRoles.roles);
        }) 

        it('just admin can remove a project relation from a user', function() {
          assert.equal('users.removeProject', removeProject.name)
          assert.sameMembers(['admin'], removeProject.checkRoles.roles);
        }) 
      })
    })
  });
}
