"use strict";

var _copyPaste = require("copy-paste");

var _copyPaste2 = _interopRequireDefault(_copyPaste);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

eval(_fs2.default.readFileSync(_path2.default.join(__dirname, '../util.js')) + '');
exports.command = 'cycle';

exports.describe = 'cycle the task,equal pop then unshift.if --reverse ,equal shift then push';

exports.builder = yargs => {
    return yargs.option('clip', {
        alias: 'c',
        describe: 'clip to clipboard',
        type: 'boolean'
    }).option('reverse', {
        alias: 'r',
        describe: 'reverse cycle',
        type: 'boolean',
        default: false
    }).help('h').alias('h', 'help');
};

exports.handler = function (argv) {
    global.readConfig(function (err, config) {
        if (err) {
            console.error(err);
            return;
        }
        if (!config.tasks) {
            config.tasks = [];
        }
        if (config.tasks.length === 0) {
            console.info("tasks is empty");
            return;
        }
        if (argv.reverse) {
            let popTask = config.tasks.shift();
            config.tasks.push(popTask);
            console.info('cycle: ' + popTask);

            if (argv.clip) {
                _copyPaste2.default.copy(popTask, () => {
                    console.info(`task '${popTask}' already copied`);
                });
            }
        } else {
            let popTask = config.tasks.pop();
            config.tasks.unshift(popTask);
            console.info('cycle: ' + popTask);

            if (argv.clip) {
                _copyPaste2.default.copy(popTask, () => {
                    console.info(`task '${popTask}' already copied`);
                });
            }
        }

        global.writeConfig(config, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.info('list:\n');
            let tasks = config.tasks.reverse();
            for (let index in tasks) {
                const task = tasks[index];
                console.log(`${index}\t: ${task}`);
            }
        });
    });
};