import { FastifyReply, FastifyRequest } from 'fastify';

const getDoc = async (
  req: FastifyRequest,
  res: FastifyReply,
): Promise<void> => {
  res
    .send('There will be some documentation, but later...')
    .log.debug(`Gave the doc route`);
};

export { getDoc };
