Template.registerHelper('getCountryName', (code) => {
  return code && Countries[code.toLowerCase()] || 'Unknown';
});

Template.registerHelper('getCountryFlag', (code) => {
  return `<span class="flag-icon flag-icon-${code}"></span>`;
});
