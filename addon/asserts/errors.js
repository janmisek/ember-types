import { defineError } from 'ember-exex/error';

export const AssertTypeError = defineError({
  name: 'AssertTypeError',
  message: 'Assert type error'
});

export const InvalidTypeError = defineError({
  name: 'InvalidTypeError',
  message: 'Invalid type error'
});

export const DefinitionError = defineError({
  name: 'DefinitionError',
  message: 'Validator definition error'
});

