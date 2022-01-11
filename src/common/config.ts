import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const PORT = Number(process.env.PORT);
const LEVEL_LOGGER = Number(process.env.LEVEL_LOGGER);
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);

const {
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;
export {
  PORT,
  LEVEL_LOGGER,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
};
