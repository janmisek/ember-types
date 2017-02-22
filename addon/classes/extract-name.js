import Ember from 'ember';
import {stringify} from './../-tools';

const unknownFunction = 'UnknownFunction';
const unknownObject = 'UnknownObject';

export const extractClassName = (subject) => {
  return subject[Ember.NAME_KEY] || subject.modelName || subject.name || stringify(subject) || unknownFunction;
};

export const exportInstanceName = (subject) => {
  return subject._debugContainerKey || subject.modelName || (subject.constructor ? extractClassName(subject.constructor) : false) || stringify(subject) || unknownObject;
};

export default function extractName(subject) {

  if (typeof subject === 'undefined') {
    return 'undefined';
  }

  if (subject === null) {
    return 'null';
  }

  if (typeof subject === 'string') {
    return `String('${subject}')`;
  }

  if (typeof subject === 'number') {
    return `Number(${subject})`;
  }

  if (typeof subject === 'boolean') {
    return `Boolean(${subject ? 'true' : 'false'})`;
  }

  if (Array.isArray(subject)) {
    return `Array (${subject.length})`;
  }

  if (typeof subject === 'function') {
    return `Class ${extractClassName(subject)}`;
  } else {
    return `Instance of ${exportInstanceName(subject)}`;
  }
}
