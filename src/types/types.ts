import { Server, IncomingMessage, ServerResponse } from 'http';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';

export interface IColumn {
  id: number;
  order: number;
  title: string;
}
export type ColumnArgType = {
  order: number;
  title: string;
};

export interface IUser {
  id: number;
  name: string;
  login: string;
  password: string;
}

export interface IBoard {
  id: string;
  title: string;
  columns?: ColumnArgType[];
}
export type BoardArgType = {
  title: string;
  columns: ColumnArgType[];
};

export interface ITask {
  id: number;
  title: string;
  order: number;
  description: string;
  userId: number | null;
  boardId: number;
  columnId: number | null;
}

export type ServerType = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyLoggerInstance
>;
