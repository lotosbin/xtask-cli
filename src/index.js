#!/usr/bin/env node
import findParentDir from "find-parent-dir";
import path from "path";
import shell from 'shelljs';
import fs from 'fs'

const yargs = require('yargs');
// noinspection BadExpressionStatementJS
yargs.usage('$0 <cmd> [args]')
    .commandDir('cmds')
    .demandCommand()
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2017 (c) liubinbin<lotosbin@gmail.com>')
    .argv;
