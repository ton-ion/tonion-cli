import chalk from 'chalk';
import { program } from '../index';
import { exit } from 'process';
import { Registry, Version } from '../registry/registry';
import { writeFileSync } from 'fs';
import { getFileName, getImportDir, getRegistry, getVersion } from '../utils/utils';
import path from 'path';

export function registerGetCommand() {
  program
    .command('get <package> [version] [registry-not-supported]')
    .action(async (p: string, v: string, r: string) => {
      console.log(chalk.greenBright(`Getting package ${p}...\n`));

      let importDir = await getImportDir();

      const registryURL = getRegistry(r);
      const version = getVersion(v);

      const getRegistryResponse = await fetch(registryURL)
        .catch((e) => {
          chalk.red.bold(`An error occurs while getting list:\n${e}`);
        })
        .then((res) => {
          return res;
        });

      if (!getRegistryResponse?.ok) {
        console.log(chalk.yellow(`Can't get registry info.\nCheck registry at: ${registryURL}`));
        exit(1);
      }

      const traitLinks = (((await getRegistryResponse.json()) as Registry).tonion[version] as Version).traits[p];
      if (!traitLinks) {
        const pName = chalk.yellow.bold(p);
        const rURL = chalk.blue.bold(registryURL);
        const ver = chalk.white.bold(version);
        console.log(
          chalk.red(
            `No such trait called ${pName} found at: ${rURL} with version: ${ver}\nTry running \`tonion list\` command`,
          ),
        );
        exit(1);
      }

      traitLinks.forEach(async (l) => {
        let name = getFileName(l);
        if (!name) {
          console.log(chalk.red(`Invalid package link: ${l}`));
          exit(1);
        }

        const response = await fetch(l);
        const buffer = Buffer.from(await response.arrayBuffer());
        const f = buffer.toString();

        await writeFileSync(importDir + name, f, 'utf-8');
      });

      console.log(chalk.greenBright(`Trait ${p} successfully added to ${importDir}`));
    })
    .description('Get a Tact package (trait) from the Tonion contracts repository.');
}
