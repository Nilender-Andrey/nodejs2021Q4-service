import * as fastify from 'fastify';
import Columns from '../column/column.model';

import {
  addBoard,
  deleteBoard,
  getBoard,
  getBoards,
  putBoard,
} from './boards.controllers';

const boardSсhema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        id: { type: 'string' },
        order: { type: 'number' },
        titleCol: { type: 'string' },
      },
    },
  },
};

const paramsSсhema = {
  type: 'object',
  required: ['boardId'],
  properties: {
    boardId: { type: 'string' },
  },
};

const bodySсhema = {
  type: 'object',
  required: ['title', 'columns'],
  titleBoard: { type: 'string' },
  columns: {
    type: 'array',
    items: {
      order: { type: 'number' },
      title: { type: 'string' },
    },
  },
};

const getBoardOpts = {
  schema: {
    params: paramsSсhema,
    response: {
      200: boardSсhema,
    },
  },
  handler: getBoard,
};

const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: boardSсhema,
      },
    },
  },
  handler: getBoards,
};

const postBoardOpts = {
  schema: {
    body: bodySсhema,
    response: {
      201: boardSсhema,
    },
  },
  handler: addBoard,
};

const putBoardOpts = {
  schema: {
    params: paramsSсhema,
    body: bodySсhema,
    response: {
      200: boardSсhema,
    },
  },
  handler: putBoard,
};

const deleteBoardOpts = {
  schema: {
    params: paramsSсhema,
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteBoard,
};

interface IParams {
  boardId: string;
}

interface IBody {
  title: string;
  columns: Columns[];
}

interface boardRequest {
  Params: IParams;
  Body: IBody;
}

/**
 * specifies the routes to process for requests to the board
 * @param server - to which requests are sent
 */

const boardRoutes: fastify.FastifyPluginAsync = async (
  server,
): Promise<void> => {
  server.get('/boards', getBoardsOpts);

  server.get<{ Params: IParams }>('/boards/:boardId', getBoardOpts);

  server.post<{ Body: IBody }>('/boards', postBoardOpts);

  server.put<boardRequest>('/boards/:boardId', putBoardOpts);

  server.delete<{ Params: IParams }>('/boards/:boardId', deleteBoardOpts);
};

export default boardRoutes;
