const fastify = require('fastify');

const server = fastify({ logger: false });

server.register(require('./resources/users/user.router'));
server.register(require('./resources/boards/boards.router'));
server.register(require('./resources/task/task.router'));

module.exports = server;
