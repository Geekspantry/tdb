Backups = new Mongo.Collection('Backups');

/*                                      */
/*                SCHEMA                */
/*                                      */

Backups.Schema = new SimpleSchema({
    model: {
      type: String
    },
    docId: {
      type: String
    },
    userId: {
      type: String
    },
    doc: {
      type: Object,
      blackbox: true
    }
});
Backups.attachSchema(Backups.Schema);
Backups.attachBehaviour('timestampable');


/*                                      */
/*                EXTENSÕES             */
/*                                      */


Backups.quickList = function(modelo,docId) {
    return this.find({modelo:modelo, docId:docId}).map(function (c) {
        return {label: formatarData(c.data), value: c._id};
    });
};

/*                                      */
/*                SEGURANÇA             */
/*                                      */

if (Meteor.isServer) {
  Backups.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}

/*                                      */
/*                HELPERS               */
/*                                      */

Backups.helpers({
  link:function(){
    return FlowRouter.path('areas.view',{id:this._id});
  },
  user:function(){
    return Meteor.users.findOne({_id: this.userId});
  }
});


