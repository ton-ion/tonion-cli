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
        console.log(chalk.red(`Can't get registry info.\nCheck registry at: ${r}`));
        exit(1);
      }

      const registry = (await getRegistryResponse.json()) as Registry;

      const metadata = registry.tonion['metadata'] as Metadata;

      console.log(`${metadata.name} contract registry:`);
      console.log('Website:', metadata.website);
      console.log('Documents:', metadata.documents);
      console.log('Status:', metadata.status);

      let version = config.LatestVersion;
      if (v) {
        version = v;
      }

      const modules = registry.tonion[version] as Version;

      for (const t in modules.traits) {
        console.log(t);
      }

      for (const c in modules.contracts) {
        console.log(c);
      }
    })
    .description('Shows the list of available modules from different providers.');
}
