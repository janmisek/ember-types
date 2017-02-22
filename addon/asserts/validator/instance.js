import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';

export default  defineValidator({
    init(Klazz) {
      this.Klazz = Klazz;
    },
    validate(value) {
      if (!(value instanceof this.Klazz)) {
        throw new InvalidTypeError(`${extractName(value)} must be instance of ${extractName(this.Klazz)}`);
      }
    }
  },
  {register: 'instance'}
);
