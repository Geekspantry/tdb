capitalizeFirstLetter = function(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

isAdmin = function() {
  return Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin', 'god']);
};

isEditor = function() {
  return Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['editor']);
};

safeFind = function() {
  if (_.isArray(array) && array.length) {
    return _.find(this.description, function(desc) {
      return desc.status === 'Published';
    });
  }
  return {};
};

