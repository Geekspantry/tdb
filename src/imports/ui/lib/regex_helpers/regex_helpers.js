
export function multiWordRegex(searchText) {
  let words = searchText.trim().split(/[ \-\:\.]+/);
  let exps = _.map(words, function(word) {
    return `(?=.*${word})`;
  });
  let fullExp = exps.join('') + '.+';
  return new RegExp(fullExp, 'i');
}

