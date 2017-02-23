# Ember-types

Sometymes you need types and assertions when organizing bigger application. This Ember addon provides extensions to assert types 
for computed properties and function parameters in runtime.
                 
```                 
                 _                    _                         
   ___ _ __ ___ | |__   ___ _ __     | |_ _   _ _ __   ___  ___ 
  / _ \ '_ ` _ \| '_ \ / _ \ '__|____| __| | | | '_ \ / _ \/ __|
 |  __/ | | | | | |_) |  __/ | |_____| |_| |_| | |_) |  __/\__ \
  \___|_| |_| |_|_.__/ \___|_|        \__|\__, | .__/ \___||___/
                                          |___/|_|              

```                 

## Installation

* `ember install ember-error-handler`

## Typed computed property

```
import { assertableComputed } from 'ember-types/property';

export default Ember.Object.extend({
  hello: assertableComputed(function() {
      return 'world'
  }).assertable('string')
});

```
## Assert type of function params

```
import { assertType } from 'ember-types/asserts';
function execute(param) {
  assertType(param, 'string');
};
```

## Types validators (assertions)

Assertions could be defined as string, Assertion Validator or Class name

### Assertion based on shortcuts

```
import { assertType } from 'ember-types/asserts';
assertType('hello world', 'string');
```

supported shortcuts

- array
- boolean
- function
- nothing
- number
- object
- string

### Assertion based on class

```
import { assertType } from 'ember-types/asserts';
assertType(myInstance, Ember.Object);
```

### Assertion based on validator

```
import { assertType } from 'ember-types/asserts';
import LogicalOr from 'ember-types/asserts/validator/logical-or'
import Enumeration from 'ember-types/asserts/validator/enumeration'

assertType(mixed, new LogicalOr(Ember.Component, Ember.Route));
assertType(mixed, new LogicalOr(Ember.Component, Ember.Route, new Enumeration(false, undefined, null));

```

### Assertion based on enumeration

```
import { assertType } from 'ember-types/asserts';

// will fail
assertType('hello', enumeration('hello', 'world'));
```

### Custom validators could be implemented

```
import { defineValidator } from 'ember-types/definition';
import { InvalidTypeError } from 'ember-types/errors';
import { extractName } from 'ember-types/classes';

export default  defineValidator(
  (value) => {
    if (typeof value !== 'boolean') {
      throw new InvalidTypeError(`value ${extractName(value)} must be boolean`);
    }
  },
  {name: 'boolean'}
);

```

See LogicalOr validator as advanced validator implementation

### Naming tooling

Extension also includes tooling for proper class / function / instance naming 

TBD

### Will-be tooling

Extension also includes tooling for definition of non-scalar values on classes 

TBD

## Function decorators

TBD
