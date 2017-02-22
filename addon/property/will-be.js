import Ember from 'ember';
import computed from './assertable-computed';
import {PropertyDefinitionError} from './errors';
const {isArray} = Ember;

export default function willBe(mixed, options) {
  options = options || {};
  options.asserted = options.asserted === undefined ? true : false;

  if (isArray(mixed)) {
    let prop = computed(() => Ember.A(mixed).toArray());
    return options.asserted ? prop.asserted('array') : prop;
  }

  if (typeof mixed === 'object') {
    let prop = computed(() => Object.assign({}, mixed));
    return options.asserted ? prop.asserted(mixed.constructor || 'object') : prop;
  }

  throw new PropertyDefinitionError('Not supported attribute for willBe');

}
