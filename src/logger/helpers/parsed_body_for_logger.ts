import { FastifyInstance } from 'fastify';
import { ServerType } from '../../types/types';
import { ADD_BODY_TO_LOG } from '../config';

/**
 * Installs a listener to receive the request body
 *
 * @param server - server instance
 * @returns listener to receive request body
 */

const parsedBodyForLogger = (server: ServerType): FastifyInstance | null =>
  ADD_BODY_TO_LOG
    ? server.addHook('preHandler', (req, reply, done) => {
        if (req.body) {
          req.log.info({ body: req.body }, `Parsed body`);
        }
        done();
      })
    : null;

export default parsedBodyForLogger;
