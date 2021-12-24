import pinoLogger, { Logger } from 'pino';

import dateFormat from './helpers/date_format';
import dataFormat from './helpers/data_format';
import setTargets from './helpers/set_targets';
import getTrackingLevel from './helpers/get_tracking_level';

export const pino: Logger = pinoLogger({
  level: getTrackingLevel(),
  transport: {
    targets: setTargets(),
  },
  serializers: dataFormat,
  timestamp: dateFormat,
});
