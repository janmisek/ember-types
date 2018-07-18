export default function defineConstants(...constants) {

  constants = Object.assign({}, ...constants);

  const _inverted = {};
  const _values = [];
  const _names = [];

  for (let k in constants) {
    if (constants.hasOwnProperty(k)) {

      const v = constants[k];

      // prepare inverted
      _inverted[v] = k;

      // prepare flat values
      _values.push(v);

      // prepare flat names
      _names.push(k);
    }
  }

  function Constants () {
    Object.assign(this, constants);
  }

  Constants.prototype.getName = function (v) {
    return _inverted[v];
  };

  Constants.prototype.getNames = function () {
    return _names;
  };

  Constants.prototype.hasValue = function (value) {
    return _values.indexOf(value) !== -1;
  };

  Constants.prototype.getValues = function () {
    return _values;
  };

  Constants.prototype.getHash = function () {
    const hash = {};
    _names.forEach((n, i) => hash[n] = _values[i]);
    return hash;
  };

  const instance = new Constants(constants)

  Object.freeze(instance);
  Object.freeze(_inverted);
  Object.freeze(_values);
  Object.freeze(_names);

  return instance;
}
