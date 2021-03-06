import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('geDiff stylish', () => {
  const expectedStylish = fs.readFileSync(getFixturePath('expectedStylish.txt'), { encoding: 'utf8' });

  it('#test json', () => {
    const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
    expect(actual).toBe(expectedStylish);
  });
  it('#test yaml', () => {
    const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
    expect(actual).toBe(expectedStylish);
  });
});

describe('geDiff plain', () => {
  const expectedPlain = fs.readFileSync(getFixturePath('expectedPlain.txt'), { encoding: 'utf8' });

  it('#test json', () => {
    const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
    expect(actual).toBe(expectedPlain);
  });
  it('#test yaml', () => {
    const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
    expect(actual).toBe(expectedPlain);
  });
});

describe('geDiff JSON', () => {
  const expectedJSON = fs.readFileSync(getFixturePath('expectedJSON.txt'), { encoding: 'utf8' });
  it('#test json', () => {
    const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
    expect(actual).toBe(expectedJSON);
  });
  it('#test yaml', () => {
    const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
    expect(actual).toBe(expectedJSON);
  });
});
describe('geDiff stylish hexlet', () => {
  const expectedStylish = fs.readFileSync(getFixturePath('expectedStylish1.txt'), { encoding: 'utf8' });

  it('#test json', () => {
    const actual = genDiff(getFixturePath('file11.json'), getFixturePath('file21.json'), 'stylish');
    expect(actual).toBe(expectedStylish);
  });
});
