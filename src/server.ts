import { PORT } from './common/config';
import server from './index';

server.listen(PORT, '0.0.0.0', (error) => {
  if (error) {
    server.log.fatal(error);
    process.exit(1);
  }
});
