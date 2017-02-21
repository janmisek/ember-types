import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';

export default  defineValidator(
  () => {

    const booleanValidator = (value) => {
      if (typeof value !== 'boolean') {
        throw new InvalidTypeError(`value ${extractName(value)} must be boolean`);
      }
    };
    
    booleanValidator.validatorName = 'booleanValidator';
    
    return booleanValidator;
    
  },
  {register: 'boolean'}
);

