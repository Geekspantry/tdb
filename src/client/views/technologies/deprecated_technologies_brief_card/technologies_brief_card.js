Template.techBriefCard.helpers({
  getLink() {
    return ''; // Milestone 1
    // return FlowRouter.path('technologies.entry', {
    //   id: this._id
    // });
  },
  //
  //  Delete Handler
  //
  onDelete() {
    let type = this._type;
    let identification = this.name;
    let _id = this._id;
    return function(data, t) {
      removeConfirmation(identification, () => {
        Meteor.call('Technologies.methods.remove', _id, (err, res) => {
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
    let type = this._type;
    let changedBriefCards = Template.instance().changedBriefCards;

    identification = this.name;
    return function(data, t) {
      Modal.show('technologiesEdit', {
        techId: data._id,
        onSuccess() {
          t.state.set('updated');
        }
      });
    };
    */
    return function(data, t) {
      FlowRouter.go('technologies.edit', {id: data._id});
    };
  }
});
