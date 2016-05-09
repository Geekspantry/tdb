Template.projectsBriefCard.helpers({
  //
  //  Delete Handler
  //
  onDelete() {
    let identification = this.name;
    let _id = this._id;
    return function(data, t) {
      removeConfirmation(identification, () => {
        Meteor.call('Projects.methods.remove', _id, (err, res) => {
          if (err) {
            return removeError();
          }
          removeSuccess();
          t.state.set('deleted');
        });
      });
    };
  },
  //
  //  Edit handler
  //
  onEdit() {
    /*
    let identification = this.name;
      return function(data, t) {
      Modal.show('projectsEdit', {
        projectId: data._id,
        onSuccess() {
          t.state.set('updated');
        }
      });
    };*/
    return function(data, t) {
      FlowRouter.go('projects.edit', {
        id: data._id
      });
    };
  }
});
