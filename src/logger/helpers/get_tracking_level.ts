import { pino } from 'pino';
import { LEVEL_LOGGER } from '../../common/config';

/**
 * Convert numeric level to string level of the logger
 *
 * @returns string level of the logger
 */

const getTrackingLevel = () => {
  let level: pino.LevelWithSilent;

  switch (LEVEL_LOGGER) {
    case 0:
      level = 'error';
      break;
    case 1:
      level = 'warn';
      break;
    case 2:
      level = 'info';
      break;
    case 3:
      level = 'debug';
      break;
    case 4:
      level = 'trace';
      break;
    default:
      level = 'trace';
      break;
  }
  return level;
};

export default getTrackingLevel;
