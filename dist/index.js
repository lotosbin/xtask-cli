#!/usr/bin/env node
'use strict';

var yargs = require('yargs');
// noinspection BadExpressionStatementJS
yargs.usage('$0 <cmd> [args]').commandDir('cmds').demandCommand().help('h').alias('h', 'help').argv;