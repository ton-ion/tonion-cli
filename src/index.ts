#!/usr/bin/env node

import { Command } from 'commander';

export const program = new Command();

program
  .name('tonion')
  .description('The Tonion is a TON and Tact development tool and a Tonion library package manager.')
  .version('0.0.1');

program.parse(process.argv);
