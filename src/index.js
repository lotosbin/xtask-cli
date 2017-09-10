#!/usr/bin/env node


var yargs = require('yargs');
// noinspection BadExpressionStatementJS
yargs.usage('$0 <cmd> [args]')
    .commandDir('cmds')
    .demandCommand()
    .help('h')
    .alias('h', 'help')
    .argv;