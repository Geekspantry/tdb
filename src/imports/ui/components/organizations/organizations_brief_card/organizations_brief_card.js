Template.orgBriefCard.helpers({
  getLink() {
    return FlowRouter.path('organizations.entry', {
      id: this._id
    });
  },
  //
  //  Delete Handler
  //
  onDelete() {
    let type = this._type;
    let identification = this.name;
    let _id = this._id;

    //let changedBriefCards = Template.instance().changedBriefCards;

    return function(data, t) {
      removeConfirmation(identification, () => {
        Meteor.call('Organizations.methods.remove', _id, (err, res) => {
          if (err) {
            return removeError();
          }
          removeSuccess();
          t.state.set('deleted');
          //changedBriefCards.push(t);
        });
      });
    };
  },
  //
  //  Edit handler
  //
  onEdit() {
    // let type = this._type;
    // let changedBriefCards = Template.instance().changedBriefCards;

    // identification = this.name;
    // return function(data, t) {
    //   Modal.show('orgEdit', {
    //     orgId: data._id,
    //     onSuccess: function() {
    //       t.state.set('updated');
    //       //  changedBriefCards.push(t);
    //     }
    //   });
    // };
    return function(data, t) {
      FlowRouter.go('organizations.edit', {
        id: data._id
      });
    };
  }
});

Template.orgBriefCard.events({
  'click .link': function() {
    FlowRouter.go('organizations.entry', {
      id: this._id
    });
  }
});
