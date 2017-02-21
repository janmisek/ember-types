import { defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';

export default  defineValidator(
  (Klazz) => {

    const instanceValidator = (value) => {
      if (!(value instanceof Klazz)) {
        throw new InvalidTypeError(`${extractName(value)} must be instance of ${extractName(Klazz)}`);
      }
    };
    
    instanceValidator.validatorName = 'instanceValidator';
    
    return instanceValidator;
    
  },
  {register: 'instance'}
); 
  
