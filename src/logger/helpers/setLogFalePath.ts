import path from 'path';

/**
 * Generates path to log file
 *
 * @param fileName - file name
 * @returns path to log file
 */

const setLogFalePath = (fileName: string): string =>
  path.join(__dirname, '../../..', fileName);

export default setLogFalePath;
