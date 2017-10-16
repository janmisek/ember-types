import {InvalidTypeError, AssertTypeError, DefinitionError} from './errors';
import {resolveValidator, getValidatorName} from './registration';

// imports default validatators to be loaded / registered automatically
import arrayValidator from './validator/array'; // eslint-disable-line no-unused-vars
import numberValidator from './validator/number'; // eslint-disable-line no-unused-vars
import stringValidator from './validator/string'; // eslint-disable-line no-unused-vars
import logicalOr from './validator/logical-or'; // eslint-disable-line no-unused-vars
import instanceValidator from './validator/instance'; // eslint-disable-line no-unused-vars
import functionValidator from './validator/function'; // eslint-disable-line no-unused-vars
import nothingValidator from './validator/nothing'; // eslint-disable-line no-unused-vars
import objectValidator from './validator/object'; // eslint-disable-line no-unused-vars
import booleanValidator from './validator/boolean'; // eslint-disable-line no-unused-vars

export const assertType = (value, validator, options) => {

  try {

    // options could be string to simplify usage
    if (typeof options === 'string') {
      options = {
        msg: options
      };
    } else {
      options = options || {};
    }

    // normalize options object
    options.exception = options.exception !== undefined ? options.exception : true;

    validator = resolveValidator(validator);
    validator.validate(value);

  } catch (e) {
    if (e instanceof InvalidTypeError) {
      if (options.exception) {
        throw new AssertTypeError(options.msg || `${getValidatorName(validator)}: invalid type.`)
          .withPreviousError(e);
      } else {
        return false;
      }
    } else {
      throw new DefinitionError()
        .withPreviousError(e);
    }
  }

  return true;

};

export const assertArgs = (args, validators) => {
  for (let i=0; i<args.length-1; args++) {
    const validator = validators[i];
    if (validator) {
      assertType(args[i], validator);
    }
  }
};
