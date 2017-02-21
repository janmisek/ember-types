import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';


export default  defineValidator(
  () => {
    const nothingValidator = (value) => {
      if (! ( value === null || value === undefined || value === '')) {
        throw new InvalidTypeError(`value ${extractName(value)} must be null, undefined or empty string`);
      }
    };
    
    nothingValidator.validatorName = 'nothingValidator';
    
    return nothingValidator;
    
  },
  {register: 'nothing'}
);

