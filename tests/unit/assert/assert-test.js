import {module, test} from 'ember-qunit';
import {assertType, defineValidator} from 'ember-types/asserts';
import {InvalidTypeError, AssertTypeError} from 'ember-types/asserts/errors';


module('assert | assert-test', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('Basic assert works ', function (assert) {

  assert.throws(() => {
    assertType('s', 'number');
  }, AssertTypeError);

  assert.ok(assertType(1, 'number'));

});

test('No exceptions ', function (assert) {

  assert.ok(!assertType('s', 'number', {exception: false}));

});

test('Custom definition works ', function (assert) {

  defineValidator(
    (value) => {
      if (value === 'a' || value === 'b') {
        throw new InvalidTypeError();
      }
    },
    {register: 'custom'}
  );

  assert.throws(() => {
    assertType('a', 'custom');
  }, AssertTypeError);

});
