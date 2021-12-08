import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: false });

server.register(import('./resources/users/user.router'));
server.register(import('./resources/boards/boards.router'));
server.register(import('./resources/task/task.router'));

export default server;
