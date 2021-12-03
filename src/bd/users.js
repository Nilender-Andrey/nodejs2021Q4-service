let users = [];

function changeBdUsers(newArr) {
  users = newArr;
}

function getBdUsers() {
  return users;
}

module.exports = { changeBdUsers, getBdUsers };
