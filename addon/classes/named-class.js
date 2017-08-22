import Ember from 'ember';

export default function namedClass(name, klazz) {
  klazz[Ember.NAME_KEY] = name;
 return klazz;
}

