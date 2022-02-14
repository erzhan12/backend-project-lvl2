import stylish from './stylish.js';
import plain from './plain.js';

const format = (resultObject, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(resultObject);
    case 'plain':
      return plain(resultObject);
    default:
      return stylish(resultObject);
  }
};

export default format;
