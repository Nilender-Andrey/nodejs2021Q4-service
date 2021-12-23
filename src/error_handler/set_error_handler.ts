import server from '../index';
import { pino } from '../logger/logger';

server.setErrorHandler(function (error, request, reply) {
  const statusCode = error.statusCode;
  if (statusCode == 404) {
    console.log('Я тут');
    pino.warn(error, error.message);

    this.log.error(error);

    reply.code(statusCode);
    // return { msg: error.message };
  }
  reply.code(500).send({ msg: 'Internal Server Error' });
});
