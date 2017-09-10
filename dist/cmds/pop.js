"use strict";

var _copyPaste = require("copy-paste");

var _copyPaste2 = _interopRequireDefault(_copyPaste);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

eval(_fs2.default.readFileSync(_path2.default.join(__dirname, '../util.js')) + '');
exports.command = 'pop';

exports.describe = 'pop the top task';

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
        let popTask = config.tasks.pop();
        if (!popTask) {
            console.info("tasks is empty");
            return;
        }
        console.info('pop: ' + popTask);
        if (argv.clip) {
            _copyPaste2.default.copy(popTask, () => {
                console.info(`task '${popTask}' already copied`);
            });
        }
        global.writeConfig(config, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.info('list:\n');
            const tasks = config.tasks;
            for (let index in tasks.reverse()) {
                let task = tasks[index];
                console.log(task);
            }
        });
    });
};