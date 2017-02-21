import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';

export default defineValidator(
  () => {
    const numberValidator = (value) => {
      if (typeof value !== 'number' || isNaN(value)) {
        throw new InvalidTypeError(`value ${extractName(value)} must be number`);
      }
    };
    
    numberValidator.validatorName = 'numberValidator';
    
    return numberValidator;
  },
  {register: 'number'}
);

