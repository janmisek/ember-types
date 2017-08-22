import Ember from 'ember';
import {module, test} from 'ember-qunit';
import {namedClass, extractName} from 'ember-types/classes';

module('classes | named-class', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('named class and extract name / classes / instances', function (assert) {

  const Klazz = namedClass('This.Is.My.Klazz', Ember.Object.extend());
  assert.equal(extractName(Klazz), "Class This.Is.My.Klazz");

  const instance = Klazz.create();
  assert.equal(extractName(instance), "Instance of This.Is.My.Klazz");

});

test('named class and extract name / scalar', function (assert) {

  assert.equal(extractName(1), "Number(1)");
  assert.equal(extractName('Kora'), "String('Kora')");
  assert.equal(extractName(false), "Boolean(false)");
  assert.equal(extractName(null), "null");
  assert.equal(extractName(undefined), "undefined");

});
