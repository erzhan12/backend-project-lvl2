import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser.js';
import format from '../formatters/index.js';

const getAbsolutePath = (fileName) => {
  if (path.isAbsolute(fileName)) return fileName;
  return path.resolve(process.cwd(), fileName);
};

const readFile = (fileName) => {
  const absolutePath = getAbsolutePath(fileName);
  const extension = path.extname(fileName);
  const fileData = fs.readFileSync(absolutePath, { encoding: 'utf8' });
  const obj = parse(fileData, extension);
  return obj;
};

const mergeKeys = (object1, object2) => Object.keys(object2)
  .reduce((acc, key2) => {
    if (!(acc.includes(key2))) {
      return [...acc, key2];
    }
    return acc;
  }, Object.keys(object1));

const isObject = (x) => x === Object(x) && !Array.isArray(x);

const genDiffObjects = (object1, object2) => {
  const assignValue = (value) => {
    if (isObject(value)) {
      return genDiffObjects(value, value);
    }
    return value;
  };
  const mergedKeys = _.sortBy(mergeKeys(object1, object2));
  const result = mergedKeys.reduce((acc, key) => {
    // If not equal
    // If both values are objects
    if (isObject(object1[key]) && isObject(object2[key])) {
      return [...acc,
        {
          key,
          sign: '&',
          value: genDiffObjects(object1[key], object2[key]),
        },
      ];
    }
    if (object1[key] === object2[key]) {
      return [...acc,
        {
          key,
          sign: '=',
          value: assignValue(object1[key]),
        },
      ];
    }
    // if changed
    if (_.has(object1, key) && _.has(object2, key)) {
      return [...acc,
        {
          key,
          sign: '*',
          oldValue: assignValue(object1[key]),
          newValue: assignValue(object2[key]),
        },
      ];
    }
    // removed
    if (_.has(object1, key)) {
      return [...acc,
        {
          key,
          sign: '-',
          oldValue: assignValue(object1[key]),
        },
      ];
    }
    // added
    if (_.has(object2, key)) {
      return [...acc,
        {
          key,
          sign: '+',
          newValue: assignValue(object2[key]),
        },
      ];
    }

    return acc;
  }, []);
  return result;
};

const genDiff = (file1, file2, formatName) => {
  const object1 = readFile(path.resolve(process.cwd(), file1));
  const object2 = readFile(path.resolve(process.cwd(), file2));

  const resultObject = genDiffObjects(object1, object2);
  // console.log(resultObject);
  const resultString = format(resultObject, formatName);

  console.log(resultString);
  return resultString;
};

export default genDiff;
