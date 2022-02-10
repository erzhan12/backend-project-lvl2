import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser.js';

const getAbsolutePath = (fileName) => {
  if (path.isAbsolute(fileName)) return fileName;
  return path.resolve(process.cwd(), fileName);
};

const readFile = (fileName) => {
  // const absolutePath = path.resolve(fileName);
  const absolutePath = getAbsolutePath(fileName);
  const extension = path.extname(fileName);
  const fileData = fs.readFileSync(absolutePath, { encoding: 'utf8' });
  const obj = parse(fileData, extension);
  // console.log(obj);
  return obj;
};

const mergeKeys = (object1, object2) => Object.keys(object2)
  .reduce((acc, key2) => {
    if (!(key2 in acc)) {
      acc.push(key2);
    }
    return acc;
  }, Object.keys(object1));

const genDiff = (file1, file2) => {
  // console.log(process.cwd());
  // console.log(path.resolve(process.cwd(), file1));
  const object1 = readFile(path.resolve(process.cwd(), file1));
  const object2 = readFile(path.resolve(process.cwd(), file2));
  const mergedKeys = mergeKeys(object1, object2).sort();
  const result = mergedKeys.reduce((acc, key) => {
    if (object1[key] === object2[key]) {
      acc[`  ${key}`] = object1[key];
      return acc;
    }
    if (_.has(object1, key)) {
      acc[`- ${key}`] = object1[key];
    }
    if (_.has(object2, key)) {
      acc[`+ ${key}`] = object2[key];
    }
    return acc;
  }, {});
  // console.log(result);
  const jsonString = JSON.stringify(result, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/: "([^"]+)"/g, ': $1');
  console.log(jsonString);
  return jsonString;
};

export default genDiff;
