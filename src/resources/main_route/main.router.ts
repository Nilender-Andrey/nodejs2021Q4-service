import * as fastify from 'fastify';
import { getMain } from './main.controllers';

const getMainOpts = {
  schema: {},
  handler: getMain,
};

const mainRoutes: fastify.FastifyPluginAsync = async (
  server,
): Promise<void> => {
  server.get('/', getMainOpts);
};

export default mainRoutes;
