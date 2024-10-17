function removeSpecialCharacters(data) {
  const regex = /[^0-9A-Za-z]*/g;

  const dataWithoutSpecialCharacters = data.replace(regex, '');

  return dataWithoutSpecialCharacters;
}

module.exports = { removeSpecialCharacters };
