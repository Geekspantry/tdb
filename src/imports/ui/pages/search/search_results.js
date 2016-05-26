import { Template } from 'meteor/templating';
import './search_results.html';

Template.searchResults.onRendered(function() {
  const cardsBox = this.firstNode;
  const options = {
    gutter: 15,
    percentPosition: true,
    columnWidth: '.cards-size',
    itemSelector: '.cards-item'
  };

  // Init
  let $cardsBox = $(cardsBox).masonry(options);

  $cardsBox.masonry('on', 'layoutComplete', (event, items) => {
    this.data.onLayoutComplete(items.length);
  });

  // Hooks
  cardsBox._uihooks = {
    insertElement(node, next) {
      // Attach a new invisible card to grid
      // it will appears only when the image is loaded.
      $(node).css('display', 'none');
      $(node).insertBefore(next);

      // Append to mansory when the card is ready
      $(node).imagesLoaded(() => {
        $cardsBox.masonry('appended', node);
        $cardsBox.masonry();
      });
    },
    removeElement(node) {
      $(node).velocity({
        opacity: [0, 1]
      }, {
        easing: 'easeOutQuad',
        duration: 200,
        queue: false,
        complete: function() {
          $(node).remove();
          $cardsBox.masonry('remove', node);
          $cardsBox.masonry();
        }
      });
    }
  };
});
