import { Server, IncomingMessage, ServerResponse } from 'http';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';

export type ServerType = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyLoggerInstance
>;
