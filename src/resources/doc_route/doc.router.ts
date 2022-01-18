import * as fastify from 'fastify';
import { getDoc } from './doc.controllers';

const getDocOpts = {
  schema: {},
  handler: getDoc,
};

const docRoutes: fastify.FastifyPluginAsync = async (server): Promise<void> => {
  server.get('/doc', getDocOpts);
};

export default docRoutes;
