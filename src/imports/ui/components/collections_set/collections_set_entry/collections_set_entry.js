import dragula from 'dragula';
import { Template } from 'meteor/templating';
import { CollectionsSet } from '../../../../api/collections_set/collections_set';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import 'meteor/chrismbeckett:toastr';

import './collections_set_entry.html';

Template.collectionsSetEntry.helpers({
  collectionsSet() {
    return CollectionsSet.findOne({
      _id: FlowRouter.getParam('cSetId'),
      projectId: FlowRouter.getParam('id')
    });
  },
  drake() {
    return Template.instance().drake;
  }
});

Template.collectionsSetEntry.events({
  'click .new-collection': function(event, template) {
    Modal.show('collectionsAdd', {
      projectId: FlowRouter.getParam('id'),
      collectionsSetId: FlowRouter.getParam('cSetId')
    });
  }
});

function handleErr(err) {
  switch (err.error) {
    case 'target-already-has-tech':
      toastr.error('Can\'t create duplicated technologies', 'Error');
      break;
    default:
      toastr.error(err.toString(), 'Error');
  }
}

Template.collectionsSetEntry.onCreated(function() {
  this.subscribe('collectionsSet.single', FlowRouter.getParam('cSetId'));
  this.drake = dragula([], {
    mirrorContainer: document.getElementById('__blaze-root'),
    copy(el) {
      return $(el).parent().data('drag') === 'stash';
    },
    accepts(el, target, source, sibling) {
      return $(target).data('drag') === 'collection';
    },
    removeOnSpill: true
  });

  this.drake
    .on('drop', (el, target, source, sibling) => {
      let position = sibling ? $(sibling).index() - 1 : null;
      let techId = $(el).data('technology-id');
      let targetType = $(target).data('drag');
      let sourceType = $(source).data('drag');

      // stash ---> collection
      if (targetType === 'collection' && sourceType === 'stash') {
        let targetCollection = $(target).data('collection');
        Collections.methods.pushTechnology.call({
          collectionId: targetCollection,
          techId: techId,
          position: position
        }, (err, res) => {
          if (err) {
            handleErr(err);
          }
          $(el).remove();
        });
      }

      // collection ---> collection
      if (sourceType === 'collection' && targetType === 'collection') {
        let sourceCollection = $(source).data('collection');
        let targetCollection = $(target).data('collection');

        Collections.methods.moveTechnology.call({
          source: sourceCollection,
          target: targetCollection,
          techId: techId,
          position: position
        }, (err, res) => {
          if (err) {
            handleErr(err);
            this.drake.cancel(true);
          }
        });
      }
    })
    .on('remove', (el, container, source) => {
      let techId = $(el).data('technology-id');
      let sourceCollection = $(source).data('collection');

      Collections.methods.pullTechnology.call({
        source: sourceCollection,
        techId: techId
      }, (err, res) => {
        if (err) {
          handleErr(err);
          this.drake.cancel(true);
        }
      });
    })
    .on('out', (el, container, source) => {
      if ($(source).data('drag') === 'collection') {
        $('.gu-mirror').addClass('out-mini-card animated shake');
      }
    })
    .on('over', (el, container, source) => {
      if ($(source).data('drag') === 'collection') {
        $('.gu-mirror').removeClass('out-mini-card animated shake');
      }
    });
});
