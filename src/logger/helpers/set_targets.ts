import path from 'path';
import pinoLogger, { TransportTargetOptions } from 'pino';

import { LEVEL_LOGGER, NODE_ENV } from '../../common/config';
import {
  OUTPUT_TO_CONSOLE,
  LOG_ERRORS_IN_ERROR_FILE,
  WRITING_LOG_TO_FILE,
  LOG_FILE_NAME,
  ERROR_FILE_NAME,
} from '../config';

const filePath = (fileName: string) =>
  path.join(__dirname, '../../..', fileName);

const setTargets = () => {
  let level: pinoLogger.LevelWithSilent;
  const targets: TransportTargetOptions[] = [];

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
    default:
      level = 'debug';
      break;
  }

  const prettyTarget = {
    level,
    target: 'pino-pretty',
    options: { colorize: true },
  };

  const logTarget = {
    level,
    target: 'pino/file',
    options: { destination: filePath(LOG_FILE_NAME), mkdir: true },
  };

  level = 'error';
  const errorTarget = {
    level,
    target: 'pino/file',
    options: { destination: filePath(ERROR_FILE_NAME), mkdir: true },
  };

  if (WRITING_LOG_TO_FILE) targets.push(logTarget);

  if (OUTPUT_TO_CONSOLE && NODE_ENV === 'development')
    targets.push(prettyTarget);

  if (LOG_ERRORS_IN_ERROR_FILE) targets.push(errorTarget);

  return targets;
};

export default setTargets;
