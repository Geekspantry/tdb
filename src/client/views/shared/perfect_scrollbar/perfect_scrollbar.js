Template.perfectScrollbar.onRendered(function() {
  Ps.initialize(this.find('.ps-container'), {
    useBothWheelAxes: true,
    handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch']
  });
});

