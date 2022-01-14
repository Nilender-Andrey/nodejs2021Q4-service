import { ConnectionOptions } from 'typeorm';
import Board from '../resources/boards/boards.model';
import Columns from '../resources/column/column.model';
import Task from '../resources/task/task.model';
import User from '../resources/users/user.model';

const configDbConnection: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [Board, User, Task, Columns],
  synchronize: false,
  logging: false,

  migrations: ['src/bd/migration/*.ts'],
  cli: {
    migrationsDir: 'src/bd/migration',
  },
  migrationsRun: true,
};

export default configDbConnection;
