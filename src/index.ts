#!/usr/bin/env node

import { Command } from 'commander';
import { registerCookCommand } from './commands/cook';
import { registerGetCommand } from './commands/get';
import { registerListCommand } from './commands/list';

export const program = new Command();

program
  .name('tonion')
  .description('The Tonion is a TON and Tact development tool and a Tonion library package manager.')
  .version('0.0.1');

registerCookCommand();
registerGetCommand();
registerListCommand();

program.parse(process.argv);
