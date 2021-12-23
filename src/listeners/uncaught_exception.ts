import { ServerType } from '../types/types';

const uncaughtExceptionListener = (server: ServerType) =>
  process.on('uncaughtException', (error) => {
    server.log.error(error);
    process.exit(1);
  });

export default uncaughtExceptionListener;
