"use strict";

var _findParentDir = require("find-parent-dir");

var _findParentDir2 = _interopRequireDefault(_findParentDir);

var _copyPaste = require("copy-paste");

var _copyPaste2 = _interopRequireDefault(_copyPaste);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.command = 'push [message]';

exports.describe = 'list all task';

exports.builder = yargs => {
    return yargs.option('clip', {
        alias: 'c',
        describe: 'clip to clipboard',
        type: 'boolean'
    }).help('h').alias('h', 'help');
};

exports.handler = function (argv) {
    let task = argv.message;
    if (task) {
        let dir;
        try {
            dir = _findParentDir2.default.sync(__dirname, '.xtask');
            if (!dir) {
                console.error('cannot find .xtask folder,please use t init command in project root');
                return;
            }
        } catch (err) {
            console.error('error', err);
            return;
        }
        const json = require('jsonfile');
        const file = dir + '.xtask/data.json';
        const config = json.readFileSync(file);
        if (!config.tasks) {
            config.tasks = [];
        }
        config.tasks.push(task);
        if (argv.clip) {
            _copyPaste2.default.copy(task, () => {
                console.info(`task '${task}' already copied`);
            });
        }
        json.writeFile(file, config, { spaces: 2 }, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            const tasks = config.tasks;
            for (let index in tasks.reverse()) {
                let task = tasks[index];
                console.log(task);
            }
        });
    }
};