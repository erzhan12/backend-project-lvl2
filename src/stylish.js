const stylish = (tree, replacer = '  ', spacesCount = 1) => {
  const iter = (node, depth) => {
    const typeOfValue = typeof node;
    if (node === null) return 'null';

    if (typeOfValue === 'object') {
      const valueIndent = replacer.repeat(spacesCount * (2 * depth - 1));
      const bracketIndent = replacer.repeat(spacesCount * (2 * depth - 2));
      const entries = Object.entries(node);
      const lines = entries.map(([key, value]) => {
        const newKey = (['+', '-'].includes(key[0])) ? key : `  ${key}`;
        return `${valueIndent}${newKey}: ${iter(value, depth + 1)}`;
      });
      // console.log(data);
      const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
      // console.log(result);
      return result;
    }
    return `${node}`; // if primitive
  };
  const result = iter(tree, 1);
  return result;
};

export default stylish;
