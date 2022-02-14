const isObject = (x) => x === Object(x);
const nextProperty = (currentProperty, newKey) => {
  const result = (currentProperty === '') ? newKey : `${currentProperty}.${newKey}`;
  return result;
};
const getUpdated = (node, key) => {
  let correspondingKey = '';
  if (key[0] === '-') correspondingKey = `+ ${key.slice(2)}`;
  else if (key[0] === '+') correspondingKey = `- ${key.slice(2)}`;
  return [node[key], node[correspondingKey]];
};

const toString = (value) => {
  const typeOfValue = typeof value;
  if (value === null) return value;
  switch (typeOfValue) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const plain = (tree) => {
  let resultString = '';

  const iter = (node, property) => {
    const entries = Object.entries(node);
    const lines = entries.reduce((acc, currentItem) => {
      const [key, value] = currentItem;
      const [oldValue, newValue] = getUpdated(node, key);
      if (newValue !== undefined) {
        if (key[0] === '-') {
          // Only one text for both '-' and '+'
          return [...acc, `Property '${property}.${key.slice(2)}' was updated. From ${toString(oldValue)} to ${toString(newValue)}`];
        }
        return acc;
      }
      if (key[0] === '+') return [...acc, `Property '${nextProperty(property, key.slice(2))}' was added with value: ${toString(value)}`];
      if (key[0] === '-') return [...acc, `Property '${nextProperty(property, key.slice(2))}' was removed`];
      if (!isObject(value)) return acc;
      return [...acc, ...iter(value, `${nextProperty(property, key)}`)];
    }, []);

    return lines;
  };

  resultString = iter(tree, '').join('\n');
  return resultString;
};

export default plain;
