import {registerValidatorShortcut} from './registration';
import {DefinitionError} from './errors';

export const BaseValidatorPrototype = {
  isValidator: true,
  validatorName: undefined,
  init() {
    // pass
  },
  validate() {
    // pass
  }
};

export const defineValidator = function (cls, options) {
  options = options || {};
  options.register = options.register === undefined ? false : options.register;
  options.name = options.name || options.register || 'Validator';
  const name = options.name;

  if (typeof cls === 'function') {
    cls = {
      validate: cls
    }
  }

  let ValidatorPrototype, Validator;

  if (typeof cls === 'object') {
    ValidatorPrototype = Object.assign({}, BaseValidatorPrototype, {name}, cls);
    Validator = function Validator() {
      this.isValidatorInstance = true;
      this.isValidator = true;
      this.validatorName = this.constructor.validatorName;
      return this.init.apply(this, arguments);
    };
    Validator.isValidatorClass = true;
    Validator.validatorName = name;
    Validator.prototype = ValidatorPrototype;
    Validator.prototype.constructor = Validator;
  }

  if (!Validator) {
    throw new DefinitionError('Cannot define validator');
  }

  if (options.register) {
    registerValidatorShortcut(options.register, Validator);
  }

  return Validator;
};


