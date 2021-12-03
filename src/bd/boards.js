let boards = [];

function changeBdBoards(newArr) {
  boards = newArr;
}

function getBdBoards() {
  return boards;
}

module.exports = { changeBdBoards, getBdBoards };
