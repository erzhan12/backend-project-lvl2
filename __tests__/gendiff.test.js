import { describe, it, expect } from '@jest/globals';
import { execSync } from 'child_process';
// import genDiff from '../src/gendiff.js';

describe('geDiff', () => {
  const expected = '{\n'
  + '  - follow: false,\n'
  + '    host: hexlet.io,\n'
  + '  - proxy: 123.234.53.22,\n'
  + '  - timeout: 50,\n'
  + '  + timeout: 20,\n'
  + '  + verbose: true\n'
  + '}\n';

  // it('#test json', () => {
  //   const actual = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  //   expect(actual).toBe(expected);
  // });
  // it('#test yaml', () => {
  //   const actual = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
  //   expect(actual).toBe(expected);
  // });
  it('#test yaml cli', () => {
    const actual = execSync('gendiff ./__fixtures__/file1.yml ./__fixtures__/file2.yml', { encoding: 'utf-8' });
    // console.log(actual);
    expect(actual).toBe(expected);
  });
  it('#test json cli', () => {
    const actual = execSync('gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json', { encoding: 'utf-8' });
    expect(actual).toBe(expected);
  });
});
