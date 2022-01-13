import { createConnection } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../common/config';
import Board from '../resources/boards/boards.model';
import Columns from '../resources/column/column.model';
import Task from '../resources/task/task.model';
import User from '../resources/users/user.model';

import { ServerType } from '../types/types';

const connectionDb = async (server: ServerType) => {
  try {
    await createConnection({
      type: 'postgres',
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,

      entities: [Board, User, Task, Columns],
      synchronize: true,
      logging: false,
    });
    server.log.info(`Database connected`);
  } catch (error) {
    server.log.error(error);
    throw new Error(`Failed to connect to database`);
  }
};

export default connectionDb;
