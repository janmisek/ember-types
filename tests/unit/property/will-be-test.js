import Ember from 'ember';
import {module, test} from 'ember-qunit';
import {PropertyAssertionError} from 'ember-types/property/errors'
import willBe from 'ember-types/property/will-be'

module('property | will-be', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('willBe assertion disability', function (assert) {
  let instance;

  instance = Ember.Object
    .extend({
      prop: willBe([1, 2, 3], {asserted: false})
    })
    .create();

  instance.set('prop',1);

  assert.ok(1);
});

test('willBe for arrays', function (assert) {
  let instance;

  const a = [1, 2, 3];
  instance = Ember.Object
    .extend({
      prop: willBe(a)
    })
    .create();

  assert.notEqual(instance.get('prop'), a);
  assert.deepEqual(instance.get('prop'), [1, 2, 3]);
  assert.throws(() => instance.set('prop',1), PropertyAssertionError);

});

test('willBe for objects', function (assert) {
  let instance;

  const o = {a: 'b'};
  instance = Ember.Object
    .extend({
      prop: willBe(o)
    })
    .create();

  assert.notEqual(instance.get('prop'), o);
  assert.deepEqual(instance.get('prop'), {a: 'b'});
  assert.throws(() => instance.set('prop',1), PropertyAssertionError);



});

