import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
// import { result } from 'lodash';

const format = (resultObject, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(resultObject);
    case 'plain':
      return plain(resultObject);
    case 'json':
      return json(resultObject);
    default:
      return stylish(resultObject);
  }
};

export default format;
