import { RequestGenericInterface } from 'fastify';
import Columns from '../column/column.model';

export interface BoardReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}

export interface BoardReqAdd extends RequestGenericInterface {
  body: {
    title: string;
    columns: Columns[];
  };
}

export interface BoardReqPut extends RequestGenericInterface {
  params: {
    boardId: string;
  };
  body: {
    title?: string;
    columns?: Columns[];
  };
}

export interface BoardReqDelete extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}
