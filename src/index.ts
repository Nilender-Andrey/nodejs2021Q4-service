import fastify from 'fastify';
import userRoutes from './resources/users/user.router';
import taskRoutes from './resources/task/task.router';
import boardRoutes from './resources/boards/boards.router';
import { pino } from './logger/logger';
import { ServerType } from './types/types';
import uncaughtExceptionListener from './listeners/uncaught_exception';
import unhandledRejectionListener from './listeners/unhandled_rejection';
import checkStartupSettings from './utils/check_startup_settings';
import setErrorHandler from './error_handler/set_error_handler';
import getTrackingLevel from './logger/helpers/get_tracking_level';
import parsedBodyForLogger from './logger/helpers/parsed_body_for_logger';

const server: ServerType = fastify({
  logger: pino,
});

server.after(() => {
  checkStartupSettings(server);
  setErrorHandler(server);
  server.log.debug(`Logging level: ${getTrackingLevel()}`);
});

parsedBodyForLogger(server);
uncaughtExceptionListener(server);
unhandledRejectionListener(server);

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);

export default server;
