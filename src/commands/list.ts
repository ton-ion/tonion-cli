import { exit } from 'process';
import { config } from '../config/config';
import { program } from '../index';
import { RegistryType } from '../registry/registry';

export function registerListCommand() {
  program
    .command('list')
    .action(async () => {
      const regResp = await fetch(config.RegistryAddress);
      if (!regResp.ok) {
        console.log("can't get registry info");
        exit(1);
      }

      const registry = (await regResp.json()) as RegistryType;

      console.log(registry['tonion']);

      // let num = 0;
      // for (const providerKey in registry.Provider) {
      //   console.log(providerKey)

      //   const provider = registry.Provider[providerKey];

      //   console.log(`Provider ${num} info:`);
      //   console.log('Name:', providerKey);
      //   console.log('Website:', provider?.Metadata.Website);
      //   console.log('Documents:', provider?.Metadata.Document);
      //   console.log('Status:', provider?.Metadata.Status);

      //   for (const versionsKey in provider?.Version) {
      //     const version = provider.Version[versionsKey];

      //     for (const traitsKey in version?.Traits) {
      //       const traits = version.Traits[traitsKey];
      //       for (const name in traits) {
      //         console.log(name);
      //       }
      //     }

      //     for (const contractsKey in version?.Contract) {
      //       const contracts = version.Contract[contractsKey];
      //       for (const name in contracts) {
      //         console.log(name);
      //       }
      //     }
      //   }
      // }
    })
    .description('Shows the list of available modules from different providers.');
}
