const stylish = (tree, indent = '  ') => {
  const iter = (element, depth = 1) => {
    if (!Array.isArray(element)) {
      return element;
    }
    const valueIndent = indent.repeat(2 * depth - 1);
    const bracketIndent = indent.repeat(2 * depth - 2);
    const lines = element.reduce((acc, node) => {
      if (node.sign === '-') {
        return [...acc, `${valueIndent}- ${node.key}: ${iter(node.oldValue, depth + 1)}`];
      }
      if (node.sign === '+') {
        return [...acc, `${valueIndent}+ ${node.key}: ${iter(node.newValue, depth + 1)}`];
      }
      if (node.sign === '*') {
        return [...acc,
          `${valueIndent}- ${node.key}: ${iter(node.oldValue, depth + 1)}`,
          `${valueIndent}+ ${node.key}: ${iter(node.newValue, depth + 1)}`,
        ];
      }
      if (node.sign === '=' || node.sign === '&') {
        return [...acc, `${valueIndent}  ${node.key}: ${iter(node.value, depth + 1)}`];
      }
      return acc;
    }, []);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  const result = iter(tree, 1);
  return result;
};

export default stylish;
