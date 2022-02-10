#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .argument('<file1>', 'first file')
  .argument('<file2>', 'second file')
  .action((file1, file2) => {
    genDiff(file1, file2);
  });
program.parse();
