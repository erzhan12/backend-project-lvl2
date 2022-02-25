import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import format from './formatters/index.js';
import genDiffObjects from './gendiffObjects.js';

const getAbsolutePath = (fileName) => {
  if (path.isAbsolute(fileName)) return fileName;
  return path.resolve(process.cwd(), fileName);
};

const getFormatName = (extension) => {
  switch (extension) {
    case '.json':
      return 'json';
    case '.yml':
    case '.yaml':
      return 'yaml';
    default:
      return 'json';
  }
};

const readFile = (fileName) => {
  const absolutePath = getAbsolutePath(fileName);
  const extension = path.extname(fileName);
  const fileData = fs.readFileSync(absolutePath, { encoding: 'utf8' });
  const formatName = getFormatName(extension);
  const obj = parse(fileData, formatName);
  return obj;
};

const genDiff = (file1, file2, formatName) => {
  const object1 = readFile(path.resolve(process.cwd(), file1));
  const object2 = readFile(path.resolve(process.cwd(), file2));

  const resultObject = genDiffObjects(object1, object2);
  const resultString = format(resultObject, formatName);

  return resultString;
};

export default genDiff;
