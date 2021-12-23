import { ServerType } from '../types/types';

const unhandledRejectionListener = (server: ServerType) =>
  process.on('unhandledRejection', (reason, promise) => {
    server.log.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

export default unhandledRejectionListener;
