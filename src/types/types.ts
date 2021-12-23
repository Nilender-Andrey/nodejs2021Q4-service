export interface IColumn {
  id: string;
  order: number;
  title: string;
}
export type ColumnArgType = {
  order: number;
  title: string;
};

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface IBoard {
  id: string;
  title: string;
  columns?: IColumn[];
}
export type BoardArgType = {
  title: string;
  columns: ColumnArgType[];
};

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

import { Server, IncomingMessage, ServerResponse } from 'http';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';

export type ServerType = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyLoggerInstance
>;
