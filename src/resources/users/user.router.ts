import * as fastify from 'fastify';
import {
  addUser,
  deleteUsers,
  getUser,
  getUsers,
  putUser,
} from './user.controllers';

// User shema
const getUserSсhema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

// options for get one user
const getUserOpts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: getUserSсhema,
    },
  },
  handler: getUser,
};

// options for get all users
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

// options for create user
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

// options for put one user
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

// options for delete user
const deleteUserOpts: fastify.RouteShorthandOptions = {
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

function userRoutes(server: fastify.FastifyInstance, options, done) {
  // GET all users
  server.get('/users', getUsersOpts);

  // GET one user
  server.get('/users/:userId', getUserOpts);

  // POST one user
  server.post('/users', postUserOpts);

  // PUT one user
  server.put('/users/:userId', putUserOpts);

  // DELETE one user
  server.delete('/users/:userId', deleteUserOpts);

  done();
}

export default userRoutes;
fastify, opts, next;
