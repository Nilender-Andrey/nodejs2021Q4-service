import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
// import userRoutes from './resources/users/user.router';

// import taskRoutes from './resources/task/task.router';
import boardRoutes from './resources/boards/boards.router';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: false });

// server.register(userRoutes);
server.register(boardRoutes);
// server.register(taskRoutes);

export default server;
