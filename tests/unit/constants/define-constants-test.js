import {module, test} from 'ember-qunit';
import {defineConstants} from 'ember-types/constants';

module('constants | define-constants', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('contants should be defined', function (assert) {
  const dict = defineConstants({
    nameA: 'valueA',
    nameB: 'valueB'
  });

  assert.deepEqual(dict.getValues(), ["valueA", "valueB"]);
  assert.deepEqual(dict.getNames(), ["nameA", "nameB"]);
  assert.deepEqual(dict.getHash(), {nameA: "valueA", nameB: "valueB"});

  assert.equal(dict.hasValue('valueA'), true);
  assert.equal(dict.hasValue('valueC'), false);

});
