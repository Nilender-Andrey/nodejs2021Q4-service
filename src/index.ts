import fastify from 'fastify';

import userRoutes from './resources/users/user.router';
import taskRoutes from './resources/task/task.router';
import boardRoutes from './resources/boards/boards.router';
import { parsedBodyForLogger, pino } from './logger/logger';
import { ServerType } from './types/types';
import uncaughtExceptionListener from './listeners/uncaught_exception';
import unhandledRejectionListener from './listeners/unhandled_rejection';

const server: ServerType = fastify({
  logger: pino,
});

parsedBodyForLogger(server);
uncaughtExceptionListener(server);
unhandledRejectionListener(server);

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);

export default server;
