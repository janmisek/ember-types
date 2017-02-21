import Ember from 'ember';

export default function namedClass(klazz, name) {
  klazz[Ember.NAME_KEY] = name;
 return klazz;
}

