import Ember from 'ember';
import {module, test} from 'ember-qunit';
import {PropertyAssertionError} from 'ember-types/property/errors'
import computed from 'ember-types/property/assertable-computed'

module('property | asserted-computed', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('Assert throws on computed properties', function (assert) {
  let instance;

  instance = Ember.Object
    .extend({
      prop: computed(function () {
        return 1;
      }).asserted('string')
    }).create();

  assert.throws(() => instance.get('prop'), PropertyAssertionError);
  assert.throws(() => instance.set('prop', 1), PropertyAssertionError);

});

test('Assert does not throw computed properties', function (assert) {
  let instance;

  instance = Ember.Object
    .extend({
      prop: computed(function () {
        return 1;
      }).asserted('number')
    }).create();

  instance.get('prop');
  instance.set('prop', 1);

  assert.ok(true);

});

test('Non asserted property works', function (assert) {
  let instance;

  instance = Ember.Object
    .extend({
      prop: computed(function () {
        return 1;
      })
    }).create();

  instance.get('prop');
  instance.set('prop', 1);

  assert.ok(true);

});
