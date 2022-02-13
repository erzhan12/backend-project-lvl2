import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser.js';
import stylish from './stylish.js';

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
      acc.push(key2);
    }
    return acc;
  }, Object.keys(object1));

const isObject = (x) => x === Object(x);

const genDiffObjects = (object1, object2) => {
  const mergedKeys = mergeKeys(object1, object2).sort();
  const result = mergedKeys.reduce((acc, key) => {
    if (object1[key] === object2[key]) {
      acc[`${key}`] = object1[key];
      return acc;
    }
    // If both values are objects
    if (isObject(object1[key]) && isObject(object2[key])) {
      acc[`${key}`] = genDiffObjects(object1[key], object2[key]);
      return acc;
    }
    // If at least one of values isn't object
    if (_.has(object1, key)) {
      acc[`- ${key}`] = object1[key];
    }
    if (_.has(object2, key)) {
      acc[`+ ${key}`] = object2[key];
    }
    return acc;
  }, {});
  return result;
};

const genDiff = (file1, file2, format) => {
  const object1 = readFile(path.resolve(process.cwd(), file1));
  const object2 = readFile(path.resolve(process.cwd(), file2));

  const resultObject = genDiffObjects(object1, object2);
  console.log(resultObject);
  // const jsonString = JSON.stringify(result, null, 3)
  //   .replace(/"([^"]+)":/g, '$1:')
  //   .replace(/: "([^"]+)",/g, ': $1')
  let resultString = '';
  switch (format) {
    case 'stylish':
      resultString = stylish(resultObject);
      break;
    default:
      resultString = stylish(resultObject);
      break;
  }
  console.log(resultString);
  return resultString;
};

export default genDiff;
