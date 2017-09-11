import ncp from "copy-paste";
import fs from "fs";
import path from "path";

eval(fs.readFileSync(path.join(__dirname, '../util.js')) + '');
exports.command = 'unshift [message]';

exports.describe = 'unshift a task';

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
        global.readConfig(function (error, config) {
            if (error) {
                console.error(error)
                return
            }
            if (!config.tasks) {
                config.tasks = [];
            }
            config.tasks.unshift(task);
            if (argv.clip) {
                ncp.copy(task, () => {
                    console.info(`task '${task}' already copied`)
                })
            }
            global.writeConfig(config, function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                const tasks = config.tasks;
                for (let index in tasks.reverse()) {
                    let task = tasks[index];
                    console.log(task);
                }
            })
        });
    }
};