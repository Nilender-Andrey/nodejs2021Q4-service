import * as fastify from 'fastify';
import { IColumn } from '../../types/types';
import {
  addTask,
  deleteTasks,
  getTask,
  getTasks,
  putTask,
} from './task.controllers';

// task shema
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

// options for get tasks in the board
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

// options for get one task in the board
const getTaskOpts = {
  schema: {
    response: {
      200: getTaskSсhema,
    },
  },
  handler: getTask,
};

// options for create task
const postTaskOpts = {
  schema: {
    /*  body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'columnId'], // 'columnId'
      titleTask: { type: 'string' },
      order: { type: 'number' },
      descriptionTask: { type: 'string' },
      userId: { type: ['string', 'null'] },
      columnId: { type: ['string', 'null'] },
    }, */
    response: {
      201: getTaskSсhema,
    },
  },
  handler: addTask,
};

// options for put one task
const putTaskOpts = {
  schema: {
    response: {
      200: getTaskSсhema,
    },
  },
  handler: putTask,
};

// options for delete task
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
  columnId: IColumn | null;
}
interface boardRequest {
  Params: IParams;
  Body: IBody;
}

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
