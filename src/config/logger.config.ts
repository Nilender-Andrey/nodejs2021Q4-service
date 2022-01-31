const SHORT_LOG_CONSOLE: true | false = true; //! Remove standard response
const LOG_FILE_NAME = 'log_file/combined.log';
const ERROR_FILE_NAME = 'log_file/error.log';

export const loggerConfig = (LEVEL_LOGGER: string) => ({
  level: LEVEL_LOGGER,
  quietReqLogger: true,
  timestamp: () =>
    `,"time":"${new Date(Date.now()).toLocaleDateString('ru-RU', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })}"`,

  transport: {
    targets: [
      {
        level: LEVEL_LOGGER,
        target: 'pino-pretty',
        options: SHORT_LOG_CONSOLE
          ? {
              colorize: true,
              hideObject: true,
              levelLabel: LEVEL_LOGGER,
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
        },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: { destination: ERROR_FILE_NAME, mkdir: true },
      },
    ],
  },
});
