import { registerAs } from '@nestjs/config';
import Board from 'src/resources/boards/boards.model';
import Columns from 'src/resources/column/column.model';
import { ConnectionOptions } from 'typeorm';

const dbConfig = (): ConnectionOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [Board, Columns /*User, Task, Columns */],
  synchronize: true,
  logging: true,

  /* migrations: ['src/bd/migration/*.ts'],
    cli: {
      migrationsDir: 'src/bd/migration',
    },
    migrationsRun: true, */
});

export default dbConfig;
