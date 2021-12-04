const RepositoryMaintenance = require('./repository_maintenance');

const users = [];
const usersDB = new RepositoryMaintenance(users);

module.exports = { usersDB };
