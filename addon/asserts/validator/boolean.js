import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';

export default  defineValidator(
  (value) => {
    if (typeof value !== 'boolean') {
      throw new InvalidTypeError(`value ${extractName(value)} must be boolean`);
    }
  },
  {register: 'boolean'}
);

