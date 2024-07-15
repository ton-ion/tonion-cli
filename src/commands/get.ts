import { program } from '../index';

program
  .command('get <package>')
  .action(() => {})
  .description('Get a Tact package from the Tonion contracts repository.');
