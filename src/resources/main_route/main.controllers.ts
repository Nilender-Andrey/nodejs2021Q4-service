import { FastifyReply, FastifyRequest } from 'fastify';

const getMain = async (
  req: FastifyRequest,
  res: FastifyReply,
): Promise<void> => {
  res
    .send('This is the main route, access to it is open to everyone')
    .log.debug(`Gave the main route`);
};

export { getMain };
