const stylish = (tree, indent = '  ') => {
  const iter = (element, depth = 1) => {
    if (!Array.isArray(element)) {
      return element;
    }
    const valueIndent = indent.repeat(2 * depth - 1);
    const bracketIndent = indent.repeat(2 * depth - 2);
    const lines = element.reduce((acc, node) => {
      let key;
      let value;
      if (node.sign === '-') {
        key = `- ${node.key}`;
        value = iter(node.oldValue, depth + 1);
      } else if (node.sign === '+') {
        key = `+ ${node.key}`;
        value = iter(node.newValue, depth + 1);
      } else if (node.sign === '*') {
        key = `- ${node.key}`;
        value = iter(node.oldValue, depth + 1);
        acc.push(`${valueIndent}${key}: ${value}`);
        key = `+ ${node.key}`;
        value = iter(node.newValue, depth + 1);
      } else if (node.sign === '=' || node.sign === '&') {
        key = `  ${node.key}`;
        value = iter(node.value, depth + 1);
      }
      return [...acc, `${valueIndent}${key}: ${value}`];
    }, []);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  const result = iter(tree, 1);
  return result;
};

// const stylishOld = (tree, replacer = '  ', spacesCount = 1) => {
//   const iter = (node, depth) => {
//     const typeOfValue = typeof node;
//     if (node === null) return 'null';

//     if (typeOfValue === 'object') {
//       const valueIndent = replacer.repeat(spacesCount * (2 * depth - 1));
//       const bracketIndent = replacer.repeat(spacesCount * (2 * depth - 2));
//       const entries = Object.entries(node);
//       const lines = entries.map(([key, value]) => {
//         const newKey = (['+', '-'].includes(key[0])) ? key : `  ${key}`;
//         return `${valueIndent}${newKey}: ${iter(value, depth + 1)}`;
//       });
//       // console.log(data);
//       const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
//       // console.log(result);
//       return result;
//     }
//     return `${node}`; // if primitive
//   };
//   const result = iter(tree, 1);
//   return result;
// };

export default stylish;
