import { PORT } from './common/config';
import server from './index';

server.listen(PORT).catch(console.error);
