import { OptionsTimeType } from '../types';

const options: OptionsTimeType = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

/**
 * Returns the date in the format [day/month/year, hours:min:sec]
 *
 * @returns date in the format [day/month/year, hours:min:sec]
 */

const dateFormat = (): string =>
  `,"time":"${new Date(Date.now()).toLocaleDateString('en-GB', options)}"`;

export default dateFormat;
