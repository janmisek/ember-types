import Ember from 'ember';
import {defineValidator} from './../definition';
import {InvalidTypeError} from './../errors';
import extractName from './../../classes/extract-name';
const {isArray} = Ember;

export default defineValidator(
  (value) => {
      if (!isArray(value)) {
        throw new InvalidTypeError(`value ${extractName(value)} must be instance of Array or Ember.A`);
      }
    },
  {register: 'array'}
);

