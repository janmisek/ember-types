export default function defineConstants(constant = {}) {

  const _inverted = {};

  const _values = [];

  const _names = [];

  for (let k in constant) {
    if (constant.hasOwnProperty(k)) {

      const v = constant[k];

      // prepare inverted
      _inverted[v] = k;

      // prepare flat values
      _values.push(v);

      // prepare flat names
      _names.push(k);
    }
  }

  constant.getName = function (v) {
    return _inverted[v];
  };

  constant.getNames = function () {
    return _names;
  };

  constant.hasValue = function (value) {
    return _values.indexOf(value) !== -1;
  };

  constant.getValues = function () {
    return _values;

  };

  constant.getHash = function () {
    const hash = {};
    _names.forEach((n, i) => hash[n] = _values[i]);
    return hash;
  };

  Object.freeze(constant);

  return constant;
}
