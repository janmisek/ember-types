import {resolveValidators, getValidatorName} from './../registration';
import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import {stringifyItems} from './../../-tools';
import extractName from './../../classes/extract-name';

export default defineValidator({
    init(validators) {
      this.validators = resolveValidators(validators);
      this.validatorName = `or (${this.stringifyValidators()})`;
    },
    stringifyValidators() {
      return stringifyItems(this.validators.map(v => getValidatorName(v)));
    },
    validate(value) {
      const found = this.validators.some((validator) => {
        try {
          validator.validate(value);
          return true;
        } catch (e) {
          if (!(e instanceof InvalidTypeError)) {
            throw e;
          }
        }
      });

      if (!found) {
        throw new InvalidTypeError(`${extractName(value)} must be one of type [ ${this.stringifyValidators()}  ]`)
      }
    }

  },
  {register: 'or'}
)
