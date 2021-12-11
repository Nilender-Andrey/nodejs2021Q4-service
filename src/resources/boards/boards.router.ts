import * as fastify from 'fastify';

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

const getBoardOpts = {
  schema: {
    params: {
      type: 'object',
      properties: {
        boardId: { type: 'string' },
      },
    },
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
    body: {
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
    },
    response: {
      201: boardSсhema,
    },
  },
  handler: addBoard,
};

const putBoardOpts = {
  schema: {
    response: {
      200: boardSсhema,
    },
  },
  handler: putBoard,
};

const deleteBoardOpts = {
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
  handler: deleteBoard,
};

interface IParams {
  boardId: string;
}

interface IBody {
  title: string;
  columns: { id: string; order: number; title: string }[];
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
  server
): Promise<void> => {
  server.get('/boards', getBoardsOpts);

  server.get<{ Params: IParams }>('/boards/:boardId', getBoardOpts);

  server.post<{ Body: IBody }>('/boards', postBoardOpts);

  server.put<boardRequest>('/boards/:boardId', putBoardOpts);

  server.delete<boardRequest>('/boards/:boardId', deleteBoardOpts);
};

export default boardRoutes;
