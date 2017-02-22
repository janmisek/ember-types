import Ember from 'ember';
import {defineValidator} from './../definition';
import {InvalidTypeError, DefinitionError} from './../errors';
import extractName from './../../classes/extract-name';
import {stringifyItems} from './../../-tools';
const {isArray} = Ember;

export default defineValidator({
    init(...items) {
      if (!isArray(items)) {
        throw new DefinitionError('items must be array');
      }
      this.items = items;
      this.validatorName = `enumeration (${stringifyItems(items)})`;
    },
    validate(value) {
      if (this.items.indexOf(value) === -1) {
        throw new InvalidTypeError(`${extractName(value)} is not included in possible enumerated of ${stringifyItems(this.items)}`);
      }
    }
  },
  {name: 'enumeration'}
);

