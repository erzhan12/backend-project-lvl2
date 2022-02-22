import fs from 'fs';
import path from 'path';
// import _ from 'lodash';
import parse from './parser.js';
import format from './formatters/index.js';
import genDiffObjects from './gendiffObjects.js';

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
