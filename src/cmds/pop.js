import findParentDir from "find-parent-dir";

import ncp from "copy-paste";

exports.command = 'pop';

exports.describe = 'pop the top task';

exports.builder = yargs => {
    return yargs.option('clip', {
        alias: 'c',
        describe: 'clip to clipboard',
        type: 'boolean'
    })
};

exports.handler = function (argv) {
    let dir;
    try {
        dir = findParentDir.sync(__dirname, '.xtask');
        if (!dir) {
            console.error('cannot find .xtask folder,please use t init command in project root');
            return;
        }
    } catch (err) {
        console.error('error', err);
        return
    }
    const json = require('jsonfile');
    const file = dir + '.xtask/data.json';
    const config = json.readFileSync(file);
    if (!config.tasks) {
        config.tasks = [];
    }
    let popTask = config.tasks.pop();
    if (!popTask) {
        console.info("tasks is empty");
        return
    }
    console.info('pop: ' + popTask);
    if (argv.clip) {
        ncp.copy(popTask, () => {
            console.info(`task '${popTask}' already copied`)
        })
    }
    json.writeFile(file, config, {spaces: 2}, function (err) {
        if (err) {
            console.error(err);
            return
        }
        console.info('list:\n');
        const tasks = config.tasks;
        for (let index in tasks.reverse()) {
            let task = tasks[index];
            console.log(task);
        }
    });
};