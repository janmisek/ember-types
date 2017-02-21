import {resolveValidators, getValidatorName} from './../registration';
import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import {stringifyItems} from './../../-tools';
import extractName from './../../classes/extract-name';

const stringifyValidators = (validators) => {
  return stringifyItems(validators.map(v => getValidatorName(v)));
};

export default defineValidator(
  (validators) => {

    validators = resolveValidators(validators);

    const logicalOr = (value) => {

      const found = validators.some((validator) => {
        try {
          validator(value);
          return true;
        } catch (e) {
          if (!(e instanceof InvalidTypeError)) {
            throw e;
          }
        }
      });

      if (!found) {
        throw new InvalidTypeError(`${extractName(value)} must be one of type [ ${stringifyValidators(validators)}  ]`)
      }
    };

    logicalOr.validatorName = `Or (${stringifyValidators(validators)})`;

    return logicalOr;
  },
  {register: 'or'}
);

