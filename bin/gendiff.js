#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

const genDiffCommand = (file1, file2, formatName) => {
  console.log(genDiff(file1, file2, formatName));
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<file1>', 'first file')
  .argument('<file2>', 'second file')
  .action((file1, file2) => {
    genDiffCommand(file1, file2, program.opts().format);
  })
  .parse();
