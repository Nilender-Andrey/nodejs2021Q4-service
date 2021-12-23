import fastify from 'fastify';

import userRoutes from './resources/users/user.router';
import taskRoutes from './resources/task/task.router';
import boardRoutes from './resources/boards/boards.router';
import { parsedBodyForLogger, pino } from './logger/logger';
import { ServerType } from './types/types';

const server: ServerType = fastify({
  logger: pino,
});

parsedBodyForLogger(server);

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);

export default server;
