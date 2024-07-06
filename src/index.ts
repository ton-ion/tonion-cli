#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
    .name("tonion")
    .description("the Tonion is a TON and Tact development tool and a Tonion library package manager.")
    .version("0.0.1");

program.command("get <package>")
    .action(() => {
    })
    .description("Get a Tact package from the Tonion contracts repository.");

program.command("cook <contract-type>")
    .action(() => {
    })
    .description("Create a contract with preferred traits and metadata.");

program.parse(process.argv);
