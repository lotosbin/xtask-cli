"use strict";

var _copyPaste = require("copy-paste");

var _copyPaste2 = _interopRequireDefault(_copyPaste);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

eval(_fs2.default.readFileSync(_path2.default.join(__dirname, '../util.js')) + '');
exports.command = 'pick [number]';

exports.describe = 'pick the specific task';

exports.builder = yargs => {
    return yargs.option('clip', {
        alias: 'c',
        describe: 'clip to clipboard',
        type: 'boolean'
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
        var index = parseInt(argv.number);
        if (index < 0 || index >= config.tasks.length) {
            config.error("number is out of range");
            return;
        }
        let tasks = config.tasks.reverse();
        let task = tasks[index];
        tasks.splice(index, 1);
        config.tasks = tasks.reverse();

        console.info('pick: ' + task);

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
        if (argv.clip) {
            _copyPaste2.default.copy(task, () => {
                console.info(`task '${task}' already copied`);
            });
        }
    });
};