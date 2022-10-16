function excludeNullValues(document) {
  Object.keys(document).forEach((key) => {
    document[key] === null && delete document[key];
  });
}

module.exports = {
  excludeNullValues,
};
