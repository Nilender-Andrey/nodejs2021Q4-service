import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const PORT = Number(process.env.PORT);

export { PORT };
