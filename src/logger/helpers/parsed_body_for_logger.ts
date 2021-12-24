import { FastifyInstance } from 'fastify';
import { ServerType } from '../../types/types';

/**
 * Installs a listener to receive the request body
 *
 * @param server - server instance
 * @returns listener to receive request body
 */

const parsedBodyForLogger = (server: ServerType): FastifyInstance =>
  server.addHook('preHandler', (req, reply, done) => {
    if (req.body) {
      req.log.info({ body: req.body }, 'parsed body');
    }
    done();
  });

export default parsedBodyForLogger;
