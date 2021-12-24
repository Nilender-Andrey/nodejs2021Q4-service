import { FastifyInstance } from 'fastify';
import { ServerType } from '../types/types';

/**
 * Set the function that will be called whenever an error happens.
 *
 * @param server - server instance
 * @returns error handling function
 */

const setErrorHandler = (server: ServerType): FastifyInstance =>
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error);

    reply.status(error.statusCode || 500).send(error.message);
  });

export default setErrorHandler;
