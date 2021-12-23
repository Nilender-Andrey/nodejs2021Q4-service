import pinoLogger from 'pino';

import { ServerType } from '../types/types';
import dateFormat from './helpers/date_format';
import dataFormat from './helpers/data_format';
import setTargets from './helpers/set_targets';

export const pino = pinoLogger({
  transport: {
    targets: setTargets(),
  },
  serializers: dataFormat,
  timestamp: dateFormat,
});

export const parsedBodyForLogger = (server: ServerType) =>
  server.addHook('preHandler', (req, reply, done) => {
    if (req.body) {
      req.log.info({ body: req.body }, 'parsed body');
    }
    done();
  });
