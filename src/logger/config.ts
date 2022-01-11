const OUTPUT_TO_CONSOLE_IN_DEVELOPMENT: true | false = true;
const LOG_ERRORS_IN_ERROR_FILE: true | false = true;
const WRITING_LOG_TO_FILE: true | false = true;
const OUTPUT_TO_CONSOLE_IN_PRODUCTION: true | false = false;
const ADD_BODY_TO_LOG: true | false = true;
const SHORT_LOG_CONSOLE: true | false = true;

const LOG_FILE_NAME = './../log/file.log';
const ERROR_FILE_NAME = './../log/error.log';

export {
  LOG_ERRORS_IN_ERROR_FILE,
  WRITING_LOG_TO_FILE,
  LOG_FILE_NAME,
  ERROR_FILE_NAME,
  OUTPUT_TO_CONSOLE_IN_PRODUCTION,
  OUTPUT_TO_CONSOLE_IN_DEVELOPMENT,
  ADD_BODY_TO_LOG,
  SHORT_LOG_CONSOLE,
};
