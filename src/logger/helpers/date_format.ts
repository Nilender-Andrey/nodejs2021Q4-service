import { OptionsTimeType } from '../types';

const options: OptionsTimeType = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const dateFormat = () =>
  `,"time":"${new Date(Date.now()).toLocaleDateString('en-GB', options)}"`;

export default dateFormat;
