import Ember from 'ember';
import {assertType} from './../asserts';
import {AssertTypeError} from './../asserts/errors';
import {PropertyAssertionError} from './errors';
import extractName from './../classes/extract-name';

export default  (func) => {
  if (!func) {
    func = () => null;
  }

  const cp = Ember.computed(func);

  cp.asserted = (validator) => {
    cp._validator = validator;
    return cp;
  };

  const superGetter = cp.get;
  cp.get = function (obj, key) {
    let v = superGetter.apply(this, arguments);

    if (cp._validator) {
      try {
        assertType(v, cp._validator);
      } catch (e) {
        if (e instanceof AssertTypeError) {
          throw new PropertyAssertionError(`Assertion on property '${key}' of '${extractName(obj)}' failed during Get`)
            .withPreviousError(e);
        } else {
          throw e;
        }
      }
    }

    return v;
  };

  const superSetter = cp.set;
  cp.set = function (obj, key, value) {

    if (cp._validator) {
      try {
        assertType(value, cp._validator);
      } catch (e) {
        if (e instanceof AssertTypeError) {
          throw new PropertyAssertionError(`Assertion on property '${key}' of '${extractName(obj)}' failed during Set`)
            .withPreviousError(e);
        } else {
          throw e;
        }
      }
    }

    return superSetter.apply(this, arguments);
  };

  return cp;
};
