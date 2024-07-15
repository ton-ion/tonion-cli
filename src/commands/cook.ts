import { program } from '../index';

export function registerCookCommand() {
  program
    .command('cook <contract-type>')
    .action(() => {})
    .description('Create a contract with preferred traits and metadata.');
}
