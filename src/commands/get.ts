import { program } from '../index';

export function registerGetCommand() {
  program
    .command('get <package>')
    .action(() => {
    })
    .description('Get a Tact package from the Tonion contracts repository.');
}
