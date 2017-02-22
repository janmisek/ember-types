import Ember from 'ember';
import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';
const {isArray} = Ember;

export default defineValidator(
  (value) => {
    if (!isArray(value)) {
      if (value === null || typeof value !== 'object') {
        throw new InvalidTypeError(`value ${extractName(value)} must be instance of Object`);
      }
    }
  },
  {register: 'object'}
);

