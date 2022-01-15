import { RequestGenericInterface } from 'fastify';

export interface TasksReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}

export interface TaskReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
}

export interface TaskReqAdd extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
  body: {
    title: string;
    order: number;
    description: string;
    columnId: string | null;
    userId: string | null;
    boardId: string;
  };
}

export interface TaskReqPut extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
  body: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string | null;
  };
}

export interface TaskReqDelete extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
}
