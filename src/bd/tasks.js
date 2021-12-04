const RepositoryMaintenance = require('./repository_maintenance');

const tasks = [];
const tasksDB = new RepositoryMaintenance(tasks);

module.exports = { tasksDB };
