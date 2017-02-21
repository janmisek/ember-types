export const stringify = (value) => {
  try {
    value = String(value);
  } catch (e) {
    value = 'unrecognized'
  }
  return value;
};

export const stringifyItems = (items) => {
  return items
    .map(i => "'" + stringify(i) + "'")
    .join(', ')
};
