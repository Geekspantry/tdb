Template.universeSelectize.events({
  'input input': function(e, t) {
    let $e = $(e.target);
    t.data.onChange && typeof t.data.onChange === 'function' && t.data.onChange($e.val());
  }
});
