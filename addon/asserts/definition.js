import { registerValidatorShortcut } from './registration';

export const defineValidator = function(factory, options) {
  options = options || {};
  options.register = options.register === undefined ? false : options.register;

  const wrapper = function() {
    const validator = factory(...arguments);
    validator.isValidator = true;
    validator.validatorName = factory.validatorName || options.register;
    return validator;
  };

  wrapper.isValidatorFactory = true;

  if (options.register) {
    registerValidatorShortcut(options.register, wrapper);
  }

  return wrapper;
};

