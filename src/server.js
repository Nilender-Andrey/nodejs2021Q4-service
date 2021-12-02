const { PORT } = require('./common/config');
const server = require('./index');

server.listen(PORT).catch(console.error);
