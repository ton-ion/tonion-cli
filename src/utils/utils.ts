import chalk from 'chalk';
import { existsSync, mkdirSync } from 'fs';
import { exit } from 'process';
import { config } from '../config/config';
import path from 'path';

export function getFileName(l: string): string | undefined {
  const parts = l.split('/');
  return parts[parts.length - 1];
}

export async function getImportDir() {
  let importDir = 'imports';
  if (!existsSync('imports')) {
    if (existsSync('contracts/imports')) {
      importDir = 'contracts/imports';
    } else {
      console.log(
        chalk.red(
          'There is no `imports` directory in your workspace\nMake sure you initialized your workspace using blueprint properly.',
        ),
      );
      exit(1);
    }
  }

  if (!existsSync(importDir + '/tonion')) {
    await mkdirSync(importDir + '/tonion');
  }

  return importDir + '/tonion/';
}

export function getRegistry(r: string): string {
  if (r) return r;
  return config.RegistryAddress;
}

export function getVersion(v: string): string {
  if (v) return v;
  return config.LatestVersion;
}
