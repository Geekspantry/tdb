import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner'
import StubCollections from 'meteor/hwillson:stub-collections';

import '../../startup/common/simpleschema_config.js'
import { Technologies } from './technologies.js';
import {
  insert,
  update,
  remove,
  linkImage,
  unlinkImage,
  updateShowcasedImage
} from './methods.js';

if (Meteor.isServer) {
  describe('technologies', function() {

    // Global id for testing
    let techId;
    let userId;

    Meteor.users.remove({});
    Technologies.remove({});


    describe('methods', function() {

      const username = 'usertester';
      const password = 'topsecret';
      userId = Accounts.createUser({ username, password })

      beforeEach(() => Roles.setUserRoles(userId, ['admin']));

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

      function invokeLinkImage(techId, imageId) {
        linkImage._execute({ userId }, {
          _id: techId,
          imageId: imageId
        });
      }

      function invokeUnlinkImage(techId, imageId) {
        unlinkImage._execute({ userId }, {
          _id: techId,
          imageId: imageId
        });
      }

      function assertTechExists(techId) {
        assert.isDefined(Technologies.findOne(techId));
      }

      function assertTechUpdated(techId, newName) {
        assert.equal(Technologies.findOne(techId).name, newName);
      }


      it('should insert a technology', function() {
        techId = invokeInsert()
        assertTechExists(techId);
      })

      it('should update a technology name', function() {
        invokeUpdate(techId, 'New tech name');
        assertTechUpdated(techId, 'New tech name');
      })

      it('should link the first image as showcased', function() {
        const imageId = Random.id();
        invokeLinkImage(techId, imageId);

        const tech = Technologies.findOne(techId);

        assert.isDefined(tech.images);
        assert.equal(imageId, tech.images[0].src);
        assert.isTrue(tech.images[0].showcased);
      })

      it('should link the second image as not showcased', function() {
        const imageId = Random.id();
        invokeLinkImage(techId, imageId);

        const tech = Technologies.findOne(techId);

        assert.equal(imageId, tech.images[1].src);
        assert.isFalse(tech.images[1].showcased);
      });

      it('should set the second image as showcased', function() {
        let tech = Technologies.findOne(techId);

        updateShowcasedImage._execute({ userId }, {
          _id: techId,
          imageId: tech.images[1].src
        })

        tech = Technologies.findOne(techId);
        assert.isTrue(tech.images[1].showcased);
      })

      it('should not unlink image if is showcased', function() {
        let tech = Technologies.findOne(techId);
        const imageId = tech.images[1].src;

        assert.throws(() => {
          invokeUnlinkImage(techId, imageId);
        }, Meteor.Error, "technologies.unlinkImage.showcasedImage");
      });


      it('should unlinkImage if is not showcased', function() {
        let tech = Technologies.findOne(techId);
        const imageId = tech.images[0].src;

        invokeUnlinkImage(techId, imageId);
        tech = Technologies.findOne(techId);

        assert.equal(1, tech.images.length);
      });
    });

    describe('persmissions', function() {
      it('just admin, editor and researcher can insert', function() {
        assert.equal('technologies.insert', insert.name)
        assert.sameMembers(['admin', 'editor', 'researcher'], insert.checkRoles.roles);
      })

      it('just admin, editor and researcher can update', function() {
        assert.equal('technologies.update', update.name)
        assert.sameMembers(['admin', 'editor', 'researcher'], update.checkRoles.roles);
      })

      it('just admin, editor and researcher can link image', function() {
        assert.equal('technologies.linkImage', linkImage.name)
        assert.sameMembers(['admin', 'editor', 'researcher'], linkImage.checkRoles.roles);
      })

      it('just admin and editor can unlink image', function() {
        assert.equal('technologies.unlinkImage', unlinkImage.name)
        assert.sameMembers(['admin', 'editor'], unlinkImage.checkRoles.roles);
      })

      it('just admin and editor can remove', function() {
        assert.equal('technologies.remove', remove.name)
        assert.sameMembers(['admin', 'editor'], remove.checkRoles.roles);
      })

      it('just admin and editors can update showcased image', function() {
        assert.equal('technologies.updateShowcasedImage', updateShowcasedImage.name)
        assert.sameMembers(['admin', 'editor'], updateShowcasedImage.checkRoles.roles);
      })
    })
  });
}
