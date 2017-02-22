import Ember from 'ember';
import {module, test} from 'ember-qunit';
import {assertType, defineValidator} from 'ember-types/asserts';
import EnumerationValidator from 'ember-types/asserts/validator/enumeration';
import { AssertTypeError } from 'ember-types/asserts/errors';


module('assert | validator', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('Number works ', function (assert) {

  assert.throws(() => {
    assertType('s', 'number');
  }, AssertTypeError);

  assert.ok(assertType(1,'number'));

});

test('String works ', function (assert) {

  assert.throws(() => {
    assertType(1, 'string');
  }, AssertTypeError);

  assert.ok(assertType('s','string'));

});

test('Array works ', function (assert) {

  assert.throws(() => {
    assertType(1, 'array');
  }, AssertTypeError);

  assert.ok(assertType([1,'2'],'array'));

});

test('Or works ', function (assert) {

  assert.throws(() => {
    assertType([], ['string', 'number']);
  }, AssertTypeError);

  const CustomValidator = defineValidator((n) => n === 0);

  assert.ok(assertType(1, ['string', 'number']));
  assert.ok(assertType('s', ['string', 'number']));
  assert.ok(assertType(0, ['string', new CustomValidator()]));

});

test('Instance works ', function (assert) {

  const Klazz1 = Ember.Object.extend();
  const Klazz2 = Ember.Object.extend();

  assert.throws(() => {
    assertType(Klazz1.create(), Klazz2);
  }, AssertTypeError);

  assert.ok(assertType(Klazz1.create(), Klazz1));
  assert.ok(assertType(Klazz2.create(), Klazz2));

});

test('Enumeration works ', function (assert) {


  assert.throws(() => {
    assertType('a', new EnumerationValidator('b','c'));
  }, AssertTypeError);

  assert.ok(assertType('a', new EnumerationValidator('a','b')));

});

test('Function works ', function (assert) {


  assert.throws(() => {
    assertType('a', 'function');
  }, AssertTypeError);

  assert.ok(assertType(() => '', 'function'));

});

test('Nothing works', function (assert) {

  assert.throws(() => {
    assertType('a', 'nothing');
  }, AssertTypeError);

  assert.ok(assertType('', 'nothing'));
  assert.ok(assertType(null, 'nothing'));
  assert.ok(assertType(undefined, 'nothing'));

});

test('Object works', function (assert) {

  assert.throws(() => {
    assertType(null, 'object');
  }, AssertTypeError);

  assert.ok(assertType({}, 'object'));
  assert.ok(assertType(new Object(), 'object'));

});

test('Boolean works', function (assert) {

  assert.throws(() => {
    assertType(null, 'object');
  }, AssertTypeError);

  assert.ok(assertType(true, 'boolean'));
  assert.ok(assertType(false, 'boolean'));

});
