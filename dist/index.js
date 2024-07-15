#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
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
