removeConfirmation = function(name, callback) {
  swal({
    title: 'Are you sure?',
    text: 'Do you want to remove <b>"' + name + '"</b> from the Technologies Stash?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes',
    closeOnConfirm: false,
    html: true
  }, () => {
    callback();
  });
};

removeSuccess = function() {
  swal('Removed!', 'Technology removed from stash.', 'success');
};

removeError = function(err) {
  swal('Error!', err, 'warning');
};


Template.techStashItem.helpers({
  getUser() {
    return Meteor.users.findOne({
      _id: this.addedBy
    });
  },
  getTechnology() {
    return Technologies.findOne({
      _id: this.technologyId
    });
  }
});


Template.techStashItem.events({
  'click .remove-tech': function(event, template) {
    let pData = Template.instance().parent().data;
    let projectId = pData.projectId;
    let techId = this._id;
    removeConfirmation(this.name, () => {
      Projects.methods.pullTechnologiesStash.call({projectId, techId}, (err, res) => {
        if (err) return removeError(err.toString(), 'Error');
        removeSuccess();
      });
    });
  }
});
