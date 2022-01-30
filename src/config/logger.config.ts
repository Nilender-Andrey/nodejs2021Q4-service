const SHORT_LOG_CONSOLE: true | false = true;
const LEVEL_LOGGER = 'info';

const LOG_FILE_NAME = 'log_file/combined.log';
const ERROR_FILE_NAME = 'log_file/error.log';

export const loggerConfig = {
  level: LEVEL_LOGGER,
  quietReqLogger: true,
  timestamp: () =>
    `,"time":"${new Date(Date.now()).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })}"`,
  serializers: {
    res: (res) => {
      return {
        statusCode: res.statusCode,
      };
    },
    req: (req) => {
      return {
        method: req.method,
        url: req.url,
        path: req.routerPath,
        parameters: req.params,
        query: req.query,
        body: req.body,
      };
    },
  },

  transport: {
    targets: [
      {
        level: LEVEL_LOGGER,
        target: 'pino/file',
        options: SHORT_LOG_CONSOLE
          ? {
              colorize: true,
              hideObject: true,
              ignore: 'pid,hostname',
            }
          : {
              colorize: true,
            },
      },
      {
        target: 'pino/file',
        level: LEVEL_LOGGER,
        options: {
          destination: LOG_FILE_NAME,
          mkdir: true,
          ignore: 'msg',
        },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: { destination: ERROR_FILE_NAME, mkdir: true },
      },
    ],
  },
};
