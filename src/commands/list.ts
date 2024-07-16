import { exit } from 'process';
import { config } from '../config/config';
import { program } from '../index';
import { Metadata, Version, Registry } from '../registry/registry';
import chalk from 'chalk';

export function registerListCommand() {
  program
    .command('list [version] [registry]')
    .action(async (v: string, r: string) => {
      let registryURL = config.RegistryAddress;
      if (r) {
        registryURL = r;
      }

      const getRegistryResponse = await fetch(registryURL)
        .catch((e) => {
          chalk.red.bold(`An error occurs while getting list:\n${e}`);
        })
        .then((res) => {
          return res;
        });

      if (!getRegistryResponse?.ok) {
        console.log(chalk.yellow(`Can't get registry info.\nCheck registry at: ${r}`));
        exit(1);
      }

      const registry = (await getRegistryResponse.json()) as Registry;

      const metadata = registry.tonion['metadata'] as Metadata;

      console.log(chalk.redBright.bold(`${metadata.name} contract registry:`));
      console.log(chalk.blue('Website:'), chalk.white(metadata.website));
      console.log(chalk.blue('Documents:'), chalk.white(metadata.documents));

      let status;
      switch (metadata.status) {
        case 'UNSTABLE': {
          status = chalk.yellow(metadata.status);
          break;
        }

        case 'STABLE': {
          status = chalk.green(metadata.status);
          break;
        }

        case 'DEPRECATED': {
          status = chalk.red(metadata.status);
          break;
        }

        default: {
          status = chalk.gray(metadata.status);
          break;
        }
      }
      console.log(chalk.white('Status:'), status);

      let version = config.LatestVersion;
      if (v) {
        version = v;
      }

      const modules = registry.tonion[version] as Version;

      console.log(chalk.bold.cyan(' Available Traits:'));
      let traitIndex = 1;
      for (const t in modules.traits) {
        console.log(chalk.blue(`  ${traitIndex}-${t}`));
        traitIndex++;
      }

      console.log(chalk.bold.cyan(' Available Contracts:'));
      let contractIndex = 1;
      for (const c in modules.contracts) {
        console.log(chalk.blue(`  ${contractIndex}-${c}`));
        contractIndex++;
      }
    })
    .description('Shows the list of available modules from different registries.');
}
