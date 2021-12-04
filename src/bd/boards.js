const RepositoryMaintenance = require('./repository_maintenance');

const boards = [];
const boardsDB = new RepositoryMaintenance(boards);

module.exports = { boardsDB };
