Template.registerHelper('pluralize', (word, count) => {
  return pluralize(word, count);
});

capitalizeFirstLetter = function(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

Template.registerHelper('capitalizeFirstLetter', (word) => {
  return capitalizeFirstLetter(word);
})