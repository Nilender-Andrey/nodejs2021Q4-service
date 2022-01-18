import { FastifyReply, FastifyRequest } from 'fastify';
import isValidHeader from './is_valid_header';

const NOT_PRIVATE_URL = ['/', '/login', '/doc'];

const isAccess = (request: FastifyRequest, reply: FastifyReply) => {
  const { url } = request;

  if (!NOT_PRIVATE_URL.includes(url) && !isValidHeader(request)) {
    reply
      .status(401)
      .send(`Please login`)
      .log.debug(`Unauthorized login attempt`);
  }
};

export default isAccess;
