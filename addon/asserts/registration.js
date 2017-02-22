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

  if (typeof validator === 'object' && validator && validator.isValidatorInstance) {
    return validator;
  }

  if (typeof validator === 'string') {
    const shortcut = validator;
    validator = new (registrations[validator])(shortcut);
    if (!validator) {
      throw new DefinitionError(`Validator for shortcut '${shortcut}' not found`);
    }
    return validator;
  }

  if (typeof validator === 'function') {
    if (validator.isValidatorClass) {
      return validator
    } else {
      const cls = validator;
      const InstanceValidator = registrations['instance'];
      return new InstanceValidator(cls);
    }
  }

  if (isArray(validator)) {
    const validators = validator;
    const OrValidator = registrations['or'];
    return new OrValidator(validators);
  }

  throw new DefinitionError(`Invalid validator defined ${extractName(validator)}`);

};


export const registerValidatorShortcut = (shortcut, validator) => {
  registrations[shortcut] = validator;
};
