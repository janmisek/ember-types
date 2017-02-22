import { defineError } from 'ember-exex/error';

export const PropertyAssertionError = defineError({
  name: 'PropertyAssertionError',
  message: 'Property assertion error'
});

export const PropertyDefinitionError = defineError({
  name: 'PropertyDefinitionError',
  message: 'Property definition error'
});
