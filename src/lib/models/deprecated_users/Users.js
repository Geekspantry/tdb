//                                       //
//                 SCHEMAS               //
//                                       //




//Meteor.isServer && Meteor.users.esDriver(esClient, 'users');

//                                       //
//                 EXTENSIONS            //
//                                       //
/*Meteor.users.quickList = function() {
  return this.find().map(function(c) {
    let nome = c.profile.nomeCompleto ? c.profile.nomeCompleto : c.emails[0].address;
    return {
      label: nome,
      value: c._id
    };
  });
};
*/
//                                       //
//                 HELPERS               //
//                                       //
