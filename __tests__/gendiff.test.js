import { describe, it, expect } from '@jest/globals';
// import { execSync } from 'child_process';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('geDiff', () => {
  const expected = '{\n'
  + '  - follow: false,\n'
  + '    host: hexlet.io,\n'
  + '  - proxy: 123.234.53.22,\n'
  + '  - timeout: 50,\n'
  + '  + timeout: 20,\n'
  + '  + verbose: true\n'
  + '}';

  it('#test json', () => {
    const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    expect(actual).toBe(expected);
  });
  it('#test yaml', () => {
    const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
    expect(actual).toBe(expected);
  });
  // it('#test yaml cli', () => {
  //   const actual = execSync('gendiff __fixtures__/file1.yml __fixtures__/file2.yml',
  // { encoding: 'utf-8' });
  //   expect(actual).toBe(expected);
  // });
  // it('#test json cli', () => {
  //   const actual = execSync('gendiff __fixtures__/file1.json __fixtures__/file2.json',
  // { encoding: 'utf-8' });
  //   expect(actual).toBe(expected);
  // });
});
