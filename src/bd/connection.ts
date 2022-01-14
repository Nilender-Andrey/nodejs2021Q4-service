import { createConnection } from 'typeorm';
import { ServerType } from '../types/types';
import configDbConnection from './ormConfig';

const connectionDb = async (server: ServerType) => {
  try {
    await createConnection(configDbConnection);
    server.log.info(`Database connected`);
  } catch (error) {
    server.log.error(error);
    // throw new Error(`Failed to connect to database`);
  }
};

export default connectionDb;
