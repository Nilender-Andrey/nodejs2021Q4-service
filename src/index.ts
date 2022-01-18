import fastify from 'fastify';
import userRoutes from './resources/users/user.router';
import taskRoutes from './resources/task/task.router';
import boardRoutes from './resources/boards/boards.router';
import loginRoutes from './resources/login/login.router';
import { pino } from './logger/logger';
import { ServerType } from './types/types';
import uncaughtExceptionListener from './listeners/uncaught_exception';
import unhandledRejectionListener from './listeners/unhandled_rejection';
import isValidStartupSettings from './utils/is_valid_startup_settings';
import setErrorHandler from './error_handler/set_error_handler';
import getTrackingLevel from './logger/helpers/get_tracking_level';
import parsedBodyForLogger from './logger/helpers/parsed_body_for_logger';
import connectionDb from './bd/connection';
import addFirstUser from './utils/add_first_user';
import isAccess from './access_token/is_access';

const server: ServerType = fastify({
  logger: pino,
});

server.after(async () => {
  await connectionDb(server);
  await addFirstUser();
  isValidStartupSettings(server);
  setErrorHandler(server);
  server.log.debug(`Logging level: ${getTrackingLevel()}`);
  server.addHook('preValidation', async (request, reply) => {
    isAccess(request, reply);
  });
});

parsedBodyForLogger(server);
uncaughtExceptionListener(server);
unhandledRejectionListener(server);

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);
server.register(loginRoutes);

export default server;
