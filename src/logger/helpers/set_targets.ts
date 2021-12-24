import { TransportTargetOptions } from 'pino';

import { NODE_ENV } from '../../common/config';
import {
  LOG_ERRORS_IN_ERROR_FILE,
  WRITING_LOG_TO_FILE,
  LOG_FILE_NAME,
  ERROR_FILE_NAME,
  OUTPUT_TO_CONSOLE_IN_PRODUCTION,
  OUTPUT_TO_CONSOLE_IN_DEVELOPMENT,
} from '../config';
import getTrackingLevel from './get_tracking_level';
import setLogFalePath from './setLogFalePath';

interface ITargetsOptions {
  prettyTarget: TransportTargetOptions;
  logTarget: TransportTargetOptions;
  errorTarget: TransportTargetOptions;
}

const targetsOptions: ITargetsOptions = {
  prettyTarget: {
    level: getTrackingLevel(),
    target: 'pino-pretty',
    options: { colorize: true },
  },

  logTarget: {
    level: getTrackingLevel(),
    target: 'pino/file',
    options: { destination: setLogFalePath(LOG_FILE_NAME), mkdir: true },
  },

  errorTarget: {
    level: 'error',
    target: 'pino/file',
    options: { destination: setLogFalePath(ERROR_FILE_NAME), mkdir: true },
  },
};

/**
 *
 * Generates logger targets depending on user settings
 *
 * @returns targets array
 */

const setTargets = (): TransportTargetOptions[] => {
  const targets: TransportTargetOptions[] = [];

  if (WRITING_LOG_TO_FILE) targets.push(targetsOptions.logTarget);

  if (OUTPUT_TO_CONSOLE_IN_DEVELOPMENT && NODE_ENV === 'development')
    targets.push(targetsOptions.prettyTarget);

  if (OUTPUT_TO_CONSOLE_IN_PRODUCTION && NODE_ENV === 'production')
    targets.push(targetsOptions.prettyTarget);

  if (LOG_ERRORS_IN_ERROR_FILE) targets.push(targetsOptions.errorTarget);

  return targets;
};

export default setTargets;
