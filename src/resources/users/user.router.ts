import * as fastify from 'fastify';
import {
  addUser,
  deleteUsers,
  getUser,
  getUsers,
  putUser,
} from './user.controllers';

const getUserSсhema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const getUserOpts = {
  schema: {
    response: {
      200: getUserSсhema,
    },
  },
  handler: getUser,
};

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: getUserSсhema,
      },
    },
  },
  handler: getUsers,
};

const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          login: { type: 'string' },
        },
      },
    },
  },
  handler: addUser,
};

const putUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          login: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
  },
  handler: putUser,
};

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteUsers,
};

interface IParams {
  userId: string;
}

interface IBody {
  name: string;
  login: string;
  password: string;
}

interface boardRequest {
  Params: IParams;
  Body: IBody;
}

/**
 * specifies the routes to process for requests to the user
 * @param server - to which requests are sent
 */

const userRoutes: fastify.FastifyPluginAsync = async (
  server
): Promise<void> => {
  server.get('/users', getUsersOpts);

  server.get<{ Params: IParams }>('/users/:userId', getUserOpts);

  server.post<{ Body: IBody }>('/users', postUserOpts);

  server.put<boardRequest>('/users/:userId', putUserOpts);

  server.delete<{ Params: IParams }>('/users/:userId', deleteUserOpts);
};

export default userRoutes;
