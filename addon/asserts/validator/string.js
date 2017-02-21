import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';

export default defineValidator(
  () => {
    const stringValidator = (value) => {
      if (typeof value !== 'string') {
        throw new InvalidTypeError(`value ${extractName(value)} must be string`);
      }
    };

    stringValidator.validatorName = 'stringValidator';

    return stringValidator;
  },
  {register: 'string'}
);

