import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify/types/request';
import isValidToken from './is_valid_token';

const privateKey = process.env.PRIVATE_KEY || 'Secret';

const isValidHeader = (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.headers.authorization) return false;

  const headerParts = request.headers.authorization.split(' ');
  if (headerParts.length !== 2) return false;
  if (headerParts[0] !== 'Bearer') return false;

  try {
    isValidToken(headerParts[1], privateKey);
  } catch (error) {
    reply.status(401).send(`Invalid token`).log.debug(`Invalid token`);
  }
  return true;
};

export default isValidHeader;
