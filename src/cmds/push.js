import findParentDir from "find-parent-dir";
import ncp from "copy-paste";

exports.command = 'push [message]';

exports.describe = 'list all task';

exports.builder = yargs => {
    return yargs.option('clip', {
        alias: 'c',
        describe: 'clip to clipboard',
        type: 'boolean'
    })
        .help('h')
        .alias('h', 'help')
};

exports.handler = function (argv) {
    let task = argv.message;
    if (task) {
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
        config.tasks.push(task);
        if (argv.clip) {
            ncp.copy(task, () => {
                console.info(`task '${task}' already copied`)
            })
        }
        json.writeFile(file, config, {spaces: 2}, function (err) {
            if (err) {
                console.error(err);
                return
            }
            const tasks = config.tasks;
            for (let index in tasks.reverse()) {
                let task = tasks[index];
                console.log(task);
            }
        });
    }
};