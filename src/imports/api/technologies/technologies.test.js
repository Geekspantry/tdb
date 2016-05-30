import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner'

import '../../startup/common/simpleschema_config.js'
import { Technologies } from './technologies.js';
import { insert, update, remove, linkImage } from './methods.js';

if (Meteor.isServer) {
  describe('Technologies', function() {

    describe('methods', function() {
      Meteor.users.remove({});

      const username = 'usertester';
      const password = 'topsecret';
      const userId = Accounts.createUser({ username, password })

      beforeEach(function() {
        Roles.setUserRoles(userId, []);
      });

      function invokeInsert() {
        const invocation = { userId };
        const args = {
          name: 'Test Technology',
          status: 'draft'
        }
        return insert._execute(invocation, args);
      }

      function invokeUpdate(_id, name) {
        const invocation = { userId };
        const args = {
          _id: _id,
          modifier: {
            $set: {
              name: name
            }
          }
        }
        return update._execute(invocation, args);
      }

      describe('when the user is admin, editor or researcher', function() {
        let techId;

        it('can add a technology', function() {
          Roles.addUsersToRoles(userId, ['admin', 'editor', 'researcher'])

          techId = invokeInsert()
          const tech = Technologies.findOne(techId);

          assert.isNotNull(tech);
        });

        it('can update a technology', function() {
          Roles.addUsersToRoles(userId, ['admin', 'editor', 'researcher'])

          const newName = 'New test title'
          invokeUpdate(techId, newName);
          const tech = Technologies.findOne(techId);

          assert.equal(tech.name, newName);
        });

        it ('can link an image to a technology', function() {
          Roles.addUsersToRoles(userId, ['admin', 'editor', 'researcher'])

          const imageId = Random.id();

          linkImage._execute({userId}, {
          	_id: techId,
          	imageId: imageId
          });

          const tech = Technologies.findOne(techId);

          assert.equal(tech.images.length, 1);
        })
      })

      describe('when the user is admin or editor', function() {

        it('can remove a technology', function() {
          Roles.addUsersToRoles(userId, ['admin', 'editor'])

        	const techId = invokeInsert()

          let tech = Technologies.findOne(techId);
          assert.isNotNull(tech);

          remove._execute({ userId }, { _id: techId })
          tech = Technologies.findOne(techId);

          assert.isUndefined(tech);
        });
      })


      describe('when the user is viewer', function() {

        it("can't add a technology", function() {
            Roles.addUsersToRoles(userId, ['viewer'])

            assert.throws(() => {
              invokeInsert();
            }, Meteor.Error, /technologies.insert.notAuthorized/);
          }),

          it("can't update a technology", function() {
            Roles.addUsersToRoles(userId, ['viewer'])

            assert.throws(() => {
              invokeUpdate('randomId', 'randomName');
            }, Meteor.Error, /technologies.update.notAuthorized/);
          })
      })
    });


  });
}
