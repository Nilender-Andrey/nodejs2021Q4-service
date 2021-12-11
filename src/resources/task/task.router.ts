import * as fastify from 'fastify';

import {
  addTask,
  deleteTasks,
  getTask,
  getTasks,
  putTask,
} from './task.controllers';

const getTaskSсhema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: 'string' },
    columnId: { type: ['string', 'null'] },
  },
};

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: getTaskSсhema,
      },
    },
  },
  handler: getTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: getTaskSсhema,
    },
  },
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    response: {
      201: getTaskSсhema,
    },
  },
  handler: addTask,
};

const putTaskOpts = {
  schema: {
    response: {
      200: getTaskSсhema,
    },
  },
  handler: putTask,
};

const deleteTaskOpts = {
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
  handler: deleteTasks,
};

interface IParams {
  boardId: string;
  taskId: string;
}

interface IBody {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}
interface boardRequest {
  Params: IParams;
  Body: IBody;
}

/**
 * specifies the routes to process for requests to the task
 * @param server - to which requests are sent
 */

const taskRoutes: fastify.FastifyPluginAsync = async (
  server
): Promise<void> => {
  server.get<boardRequest>('/boards/:boardId/tasks', getTasksOpts);

  server.get<boardRequest>('/boards/:boardId/tasks/:taskId', getTaskOpts);

  server.post<boardRequest>('/boards/:boardId/tasks', postTaskOpts);

  server.put<boardRequest>('/boards/:boardId/tasks/:taskId', putTaskOpts);

  server.delete<boardRequest>('/boards/:boardId/tasks/:taskId', deleteTaskOpts);
};

export default taskRoutes;
