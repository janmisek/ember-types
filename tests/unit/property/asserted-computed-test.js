import Ember from 'ember';
import {module, test} from 'ember-qunit';
import {PropertyAssertionError} from 'ember-types/property/errors'
import asserted from 'ember-types/property/assertable-computed'
const {computed} = Ember;

module('property | asserted-computed', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('Assert throws on computed properties', function (assert) {
  let instance;

  instance = Ember.Object
    .extend({

      prop1: asserted('string', computed(function () {
        return 1;
      })),

      prop2: asserted('string', function () {
        return 1;
      })

    }).create();

  assert.throws(() => instance.get('prop1'), PropertyAssertionError);
  assert.throws(() => instance.set('prop1', 1), PropertyAssertionError);

  assert.throws(() => instance.get('prop2'), PropertyAssertionError);
  assert.throws(() => instance.set('prop2', 1), PropertyAssertionError);

});

test('Assert does not throw computed properties', function (assert) {
  let instance;

  instance = Ember.Object
    .extend({
      prop: asserted('number', computed(function () {
        return 1;
      }))
    }).create();

  instance.get('prop');
  instance.set('prop', 1);

  assert.ok(true);

});

test('Assert works for empty properties', function (assert) {
  let instance;

  instance = Ember.Object
    .extend({
      prop: asserted('number')
    }).create();

  assert.throws(() => instance.set('prop', 'hello'), PropertyAssertionError);

  assert.ok(true);

});
