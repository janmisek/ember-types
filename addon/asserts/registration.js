import Ember from 'ember';
import { DefinitionError } from './errors';
import extractName from './../classes/extract-name';
const {isArray} = Ember;

export const registrations = {};

export const getValidatorName = (validator) => {
  return validator.validatorName;
};

export const resolveValidators = (validators) => {
  return validators.map(v => resolveValidator(v));
};

export const resolveValidator = (validator) => {

  if (typeof validator === 'string') {
    const shortcut = validator;
    validator = registrations[validator];
    if (!validator) {
      throw new DefinitionError(`Validator for shortcut '${shortcut}' not found`);
    }
    return validator();
  }

  if (typeof validator === 'function') {
    if (validator.isValidator) {
      return validator
    } else {
      return registrations['instance'](validator);
    }

  }

  if (isArray(validator)) {
    return registrations['or'](validator);
  }

  throw new DefinitionError(`Invalid validator defined ${extractName(validator)}`);

};


export const registerValidatorShortcut = (shortcut, validator) => {
  registrations[shortcut] = validator;
};
