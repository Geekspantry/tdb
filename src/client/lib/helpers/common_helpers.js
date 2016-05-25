import { Icons, Colors } from '/imports/resources/resources.js';

Template.registerHelper('SearchSources', () => SearchSources);
Template.registerHelper('Schemas', () => Schemas);
Template.registerHelper('Icons', () => Icons);

Template.registerHelper('getGenderIcon', (gender) => {
  let icon = gender && Icons.gender[gender.toLowerCase()] || Icons.gender.default;
  return `<i class="${icon}""></i>`;
});

Template.registerHelper('formatOrgType', function(orgType, makeBadge) {
  let text = capitalizeFirstLetter(orgType);
  let color = orgType && Colors.org.type[orgType.toLowerCase()] || Colors.org.type.default;
  return makeBadge ? `<span class="badge badge-${color}">${text}</span>` : text;
});

Template.registerHelper('formatRole', function(role, makeBadge) {
  let text = capitalizeFirstLetter(role);
  let color = role && Colors.users.role[role.toLowerCase()] || Colors.users.role.default;
  return makeBadge ? `<span class="badge badge-${color}">${text}</span>` : text;
});

Template.registerHelper('formatReais', function(valor) {
  return accounting.formatMoney(valor, 'R$ ', 2, '.', ',');
});

Template.registerHelper('capitalizeFirstLetter', (text) => {
  return capitalizeFirstLetter(text);
});

Template.registerHelper('shortIt', function(stringToShorten, maxCharsAmount) {
  if (stringToShorten.length > maxCharsAmount) {
    return stringToShorten.substring(0, maxCharsAmount) + '...';
  }
  return stringToShorten;
});

Template.registerHelper('concat', function() {
  return Array.prototype.slice.call(arguments, 0, -1).join('');
});


Template.registerHelper('techColor', function(status) {
  return Colors.tech.status[status] || Colors.tech.status.default;
});


Template.registerHelper('extendContext', function(data) {
  let result = _.clone(this);
  _.each(data.hash, function(value, key) {
    result[key] = value;
  });
  return result;
});

Template.registerHelper('literalKey', function(key) {
  return this[key];
});
