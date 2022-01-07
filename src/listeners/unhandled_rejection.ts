import { ServerType } from '../types/types';

/**
 * Installs an unhandledRejection listener
 *
 * @param server - server instance
 * @returns unhandledRejection listener
 */

const unhandledRejectionListener = (server: ServerType) =>
  process.on('unhandledRejection', (reason, promise) => {
    server.log.warn('Unhandled Rejection at:', promise, 'reason:', reason);
  });

export default unhandledRejectionListener;
