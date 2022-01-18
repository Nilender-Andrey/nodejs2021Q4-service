import { FastifyRequest } from 'fastify/types/request';
import isValidToken from './is_valid_token';

const privateKey = process.env.PRIVATE_KEY || 'Secret';

const isValidHeader = (request: FastifyRequest) => {
  if (!request.headers.authorization) return false;

  const headerParts = request.headers.authorization.split(' ');
  if (headerParts.length !== 2) return false;
  if (headerParts[0] !== 'Bearer') return false;

  const resultValidToken = isValidToken(headerParts[1], privateKey);

  if (!resultValidToken) return false;
  return true;
};

export default isValidHeader;
