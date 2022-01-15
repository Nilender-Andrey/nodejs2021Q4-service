import { LEVEL_LOGGER } from '../common/config';
import { ServerType } from '../types/types';

/**
 * Checks if the logging level is set correctly
 * and displays an error message
 * @param server - server instance
 */

const checkStartupSettings = (server: ServerType) => {
  if (LEVEL_LOGGER < 0 || LEVEL_LOGGER > 4) {
    server.log.warn('Incorrect logging level');
  }
};

export default checkStartupSettings;
