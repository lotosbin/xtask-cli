#!/usr/bin/env node
"use strict";

var _findParentDir = require("find-parent-dir");

var _findParentDir2 = _interopRequireDefault(_findParentDir);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const yargs = require('yargs');
// noinspection BadExpressionStatementJS
yargs.usage('$0 <cmd> [args]').commandDir('cmds').demandCommand().help('h').alias('h', 'help').epilog('copyright 2017 (c) liubinbin<lotosbin@gmail.com>').argv;