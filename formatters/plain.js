const nextProperty = (currentProperty, newKey) => {
  const result = (currentProperty === '') ? newKey : `${currentProperty}.${newKey}`;
  return result;
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
  const iter = (element, property = '', prevSign = '&') => {
    if (!Array.isArray(element)) {
      return toString(element);
    }

    const lines = element.reduce((acc, node) => {
      if (node.sign === '-') {
        return [...acc, `Property '${nextProperty(property, node.key, node.sign)}' was removed`];
      }
      if (node.sign === '+') {
        return [...acc, `Property '${nextProperty(property, node.key)}' was added with value: ${iter(node.newValue, node.key, node.sign)}`];
      }
      if (node.sign === '*') {
        return [...acc, `Property ${nextProperty(property, node.key)}'' was updated. From ${iter(node.oldValue, node.key, node.sign)} to ${iter(node.newValue, node.key, node.sign)}`];
      }
      if (node.sign === '&') {
        return [...acc, ...iter(node.value, `${nextProperty(property, node.key, node.sign)}`)];
      }
      if (node.sign === '=' && ['+', '-', '*'].includes(prevSign)) {
        return [...acc, toString(node)];
      }
      return acc;
    }, []);
    return lines;
  };
  const resultString = iter(tree).join('\n');
  return resultString;
};

export default plain;
