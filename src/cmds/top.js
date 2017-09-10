import findParentDir from "find-parent-dir";

exports.command = ['top', 't'];

exports.describe = 'top task';

exports.builder = yargs => {
    return yargs.option('clip', {
        alias: 'c',
        describe: 'clip to clipboard',
        type: 'boolean'
    })
        .help('h')
        .alias('h', 'help');
};
const ncp = require("copy-paste");

exports.handler = function (argv) {
    let dir;
    try {
        dir = findParentDir.sync(__dirname, '.xtask');
        if (!dir) {
            console.error('cannot find .xtask folder,please use t init command in project root')
            return;
        }
    } catch (err) {
        console.error('error', err);
        return
    }
    const json = require('jsonfile');
    const file = dir + '.xtask/data.json';
    const config = json.readFileSync(file);
    const tasks = config.tasks || [];
    let task = tasks[0];
    if (!task) {
        console.info("there is no task current");
        return
    }
    console.log(task);
    if (argv.clip) {
        ncp.copy(task, () => {
            console.info(`task '${task}' already copied`)
        })
    }
};