import Ember from 'ember';
import {defineValidator} from './../definition';
import {InvalidTypeError, DefinitionError} from './../errors';
import extractName from './../../classes/extract-name';
import {stringifyItems} from './../../-tools';
const {isArray} = Ember;

export default defineValidator(
  (...items) => {

    if (!isArray(items)) {
      throw new DefinitionError('items must be array');
    }

    const enumerationValidator = (value) => {
      if (items.indexOf(value) === -1) {
        throw new InvalidTypeError(`${extractName(value)} is not included in possible enumerated of ${stringifyItems(items)}`);
      }
    };

    enumerationValidator.validatorName = `enumerationValidator (${stringifyItems(items)})`;

    return enumerationValidator;

  },
  {register: false}
);

