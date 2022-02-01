import {
  LOGGER_ON_OFF,
  SHORT_LOG_CONSOLE,
  AUTO_LOGGING_ON_OFF,
  LOG_FILE_NAME,
  ERROR_FILE_NAME,
} from '../config/logger.config';

class LoggerConfig {
  private LEVEL_LOGGER: string;

  constructor(LEVEL_LOGGER: string) {
    this.LEVEL_LOGGER = LEVEL_LOGGER;
  }

  config() {
    return {
      level: this.LEVEL_LOGGER,
      enabled: LOGGER_ON_OFF,
      autoLogging: AUTO_LOGGING_ON_OFF,
      quietReqLogger: true,
      timestamp: this.timestamp(),
      transport: this.transport(),
    };
  }

  private timestamp() {
    return `,"time":"${new Date(Date.now()).toLocaleDateString('ru-RU', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })}"`;
  }

  private transport() {
    return {
      targets: [
        {
          level: this.LEVEL_LOGGER,
          target: 'pino-pretty',
          options: SHORT_LOG_CONSOLE
            ? {
                colorize: true,
                hideObject: true,
                levelLabel: this.LEVEL_LOGGER,
              }
            : {
                colorize: true,
              },
        },
        {
          target: 'pino-pretty',
          level: this.LEVEL_LOGGER,
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
    };
  }
}

export default LoggerConfig;
