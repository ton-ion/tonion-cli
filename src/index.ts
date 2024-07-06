#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
    .name("tonion")
    .description("tonion is a TON and Tact development tool and a tonion library package manager.")
    .version("0.0.1");

program.command("get <package>")
    .action(() => {
    })
    .description("Get a Tact package from the Tonion contracts repository.");

program.parse(process.argv);
