import * as fastify from 'fastify';
import { getLogin, postLogin } from './login.controllers';
import { ILoginReqBody } from './login.type';

const getLoginOpts = {
  schema: {},
  handler: getLogin,
};

const postLoginOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          login: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
  },
  handler: postLogin,
};

const loginRoutes: fastify.FastifyPluginAsync = async (
  server,
): Promise<void> => {
  server.get('/login', getLoginOpts);
  server.post<{ Body: ILoginReqBody }>('/login', postLoginOpts);
};

export default loginRoutes;
