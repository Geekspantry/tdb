Template.customProgressBar.onCreated(function() {
  console.log(this.data);
})

Template.universeSelectize.events({
  'input input': function(e, t) {
    let $e = $(e.target);
    console.log(t.data.onChange);
    t.data.onChange &&  typeof t.data.onChange === 'function' && t.data.onChange($e.val());
  }
});