Template.registerHelper('SearchSources', () => SearchSources);
Template.registerHelper('Schemas', () => Schemas);
Template.registerHelper('Icons', () => Icons);

Template.registerHelper('getGenderIcon', (gender) => {
  let icon = gender && Icons.gender[gender.toLowerCase()] || Icons.gender.default;
  return `<i class="${icon}""></i>`;
});

Template.registerHelper('formatOrgType', function(orgType, makeBadge) {
  let text = capitalizeFirstLetter(orgType);
  let color = orgType && ColorMap.org.type[orgType.toLowerCase()] || ColorMap.org.type.default;
  return makeBadge ? `<span class="badge badge-${color}">${text}</span>` : text;
});

Template.registerHelper('formatRole', function(role, makeBadge) {
  let text = capitalizeFirstLetter(role);
  let color = role && ColorMap.users.role[role.toLowerCase()] || ColorMap.users.role.default;
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
  switch (status) {
    case 'draft':
      return 'danger';
    case 'review':
      return 'warning';
    case 'published':
      return 'primary';
    default:
      return 'default';
  }
});

