import { ServerType } from '../types/types';

const setErrorHandler = (server: ServerType) =>
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error);

    reply.status(error.statusCode || 500).send(error);
  });

export default setErrorHandler;
