import { createConnection } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../common/config';
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
      name: POSTGRES_USER,
    });
    server.log.info(`Database "${POSTGRES_DB}" connected`);
  } catch (error) {
    server.log.error(`Failed to connect to database. ${error}`);
    // process.exit(1);
  }
};

export default connectionDb;
