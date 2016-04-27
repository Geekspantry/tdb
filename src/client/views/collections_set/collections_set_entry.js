import dragula from 'dragula';

Template.collectionsSetEntry.helpers({
  collectionsSet() {
    return CollectionsSet.findOne({
      _id: FlowRouter.getParam('id'),
      projectId: FlowRouter.getParam('projectId')
    });
  },
  drake() {
    return Template.instance().drake;
  }
});

Template.collectionsSetEntry.events({
  'click .new-collection': function(event, template) {
    Modal.show('collectionsAdd', {
      projectId: FlowRouter.getParam('projectId'),
      collectionsSetId: FlowRouter.getParam('id')
    });
  }
});

function handleErr(err) {
  switch (err.error) {
    case 'target-already-has-tech':
      toastr.error('Can\'t create duplicated technologies', 'Error');
      break;
    default:
      {
        toastr.error(err.toString(), 'Error');
      }
  }
}

Template.collectionsSetEntry.onRendered(function() {
  this.subscribe('collectionsSet.single', FlowRouter.getParam('id'));
  this.drake = dragula([], {
    mirrorContainer: document.getElementById('__blaze-root'),
    copy(el) {
      return $(el).parent().data('drag') === 'stash';
    },
    accepts(el, target, source, sibling) {
      return $(target).data('drag') === 'collection';
    },
    //revertOnSpill: true
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
