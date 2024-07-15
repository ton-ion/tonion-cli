import { program } from '../index';

program
  .command('cook <contract-type>')
  .action(() => {})
  .description('Create a contract with preferred traits and metadata.');
