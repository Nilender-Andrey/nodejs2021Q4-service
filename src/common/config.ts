import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const PORT = Number(process.env.PORT);
const LEVEL_LOGGER = Number(process.env.LEVEL_LOGGER);
const NODE_ENV = process.env.NODE_ENV;
export { PORT, LEVEL_LOGGER, NODE_ENV };
