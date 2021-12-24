import { ServerType } from '../types/types';

/**
 * Installs an uncaughtException listener
 *
 * @param server - server instance
 * @returns uncaughtException listener
 */

const uncaughtExceptionListener = (server: ServerType) =>
  process.on('uncaughtException', (error) => {
    server.log.error(error);
    process.exit(1);
  });

export default uncaughtExceptionListener;
