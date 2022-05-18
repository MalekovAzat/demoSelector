function findPositionById(id, array) {
  return array.findIndex((element) => {
    return element.id === id;
  });
}

module.exports = { findPositionById };
